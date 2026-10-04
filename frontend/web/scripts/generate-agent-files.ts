import fs from 'node:fs/promises';
import { existsSync, statSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import ts from 'typescript-compiler-api';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CLIENT_DIR = path.join(ROOT, 'dist', 'client');
const ROUTES_FILE = path.join(ROOT, 'packages', 'app', 'routes.tsx');
const SITE_ORIGIN = process.env.SITE_ORIGIN ?? 'https://codyduong.dev';
const EXCLUDE_COMPONENTS = new Set(['Redirect', 'NotFound']);

// eslint-disable-next-line prettier/prettier
const LLMS_PREAMBLE = 
`Hi, I'm Cody Duong. This is my personal website and portfolio — a from-scratch
React + Vite application with server-side rendering. It documents my work history
projects, and a couple of statements about how this site is built and maintained
The links below are the primary pages; each line is title, URL, and a short summary`;

interface Candidate {
  url: string;
  component: string | undefined;
}

interface HeadMeta {
  title: string;
  description: string | undefined;
}

interface Page extends HeadMeta {
  url: string;
  source: string | undefined;
}

const joinPath = (base: string, seg: string): string => `/${`${base}/${seg}`.split('/').filter(Boolean).join('/')}`;

const unwrapArray = (body: ts.ConciseBody): ts.NodeArray<ts.Expression> | undefined => {
  if (ts.isArrayLiteralExpression(body)) return body.elements;
  if (ts.isParenthesizedExpression(body)) return unwrapArray(body.expression);
  if (ts.isBlock(body)) {
    for (const st of body.statements) {
      if (ts.isReturnStatement(st) && st.expression) return unwrapArray(st.expression);
    }
  }
  return undefined;
};

/** Parse routes.tsx into page candidates plus an identifier -> import-specifier map. */
const parseRoutes = (): { candidates: Candidate[]; imports: Map<string, string> } => {
  const src = ts.createSourceFile(
    ROUTES_FILE,
    ts.sys.readFile(ROUTES_FILE) ?? '',
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  const imports = new Map<string, string>(); // localName -> module specifier
  let routesArray: ts.NodeArray<ts.Expression> | undefined;

  src.forEachChild((node) => {
    if (ts.isImportDeclaration(node) && node.importClause?.name && ts.isStringLiteral(node.moduleSpecifier)) {
      imports.set(node.importClause.name.text, node.moduleSpecifier.text);
    }
    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (decl.name.getText(src) === 'createAppRoutes' && decl.initializer && ts.isArrowFunction(decl.initializer)) {
          routesArray = unwrapArray(decl.initializer.body);
        }
      }
    }
  });

  if (!routesArray) throw new Error('Could not locate the createAppRoutes route array in routes.tsx');

  const prop = (obj: ts.ObjectLiteralExpression, name: string): ts.ObjectLiteralElementLike | undefined =>
    obj.properties.find(
      (p) => (ts.isPropertyAssignment(p) || ts.isShorthandPropertyAssignment(p)) && p.name.getText(src) === name,
    );
  const strProp = (obj: ts.ObjectLiteralExpression, name: string): string | undefined => {
    const p = prop(obj, name);
    return p && ts.isPropertyAssignment(p) && ts.isStringLiteralLike(p.initializer) ? p.initializer.text : undefined;
  };
  const isIndexRoute = (obj: ts.ObjectLiteralExpression): boolean => {
    const p = prop(obj, 'index');
    return !!(p && ts.isPropertyAssignment(p) && p.initializer.kind === ts.SyntaxKind.TrueKeyword);
  };
  const childrenOf = (obj: ts.ObjectLiteralExpression): ts.NodeArray<ts.Expression> | undefined => {
    const p = prop(obj, 'children');
    return p && ts.isPropertyAssignment(p) && ts.isArrayLiteralExpression(p.initializer)
      ? p.initializer.elements
      : undefined;
  };
  const componentOf = (obj: ts.ObjectLiteralExpression): string | undefined => {
    const p = prop(obj, 'element');
    if (!p || !ts.isPropertyAssignment(p)) return undefined;
    const el = p.initializer;
    if (ts.isJsxSelfClosingElement(el)) return el.tagName.getText(src);
    if (ts.isJsxElement(el)) return el.openingElement.tagName.getText(src);
    return undefined;
  };

  const out: Candidate[] = [];
  const walk = (elements: ts.NodeArray<ts.Expression>, base: string): void => {
    for (const el of elements) {
      if (!ts.isObjectLiteralExpression(el)) continue;
      const children = childrenOf(el);
      const p = strProp(el, 'path');
      if (children) {
        walk(children, p ? joinPath(base, p) : base);
        continue; // layout route, not a page
      }
      const component = componentOf(el);
      if (component && EXCLUDE_COMPONENTS.has(component)) continue; // redirect / 404
      let url: string;
      if (isIndexRoute(el)) url = base || '/';
      else if (!p || p === '*') continue;
      else url = joinPath(base, p.replace(/\/?\*$/, ''));
      out.push({ url: url || '/', component });
    }
  };
  walk(routesArray, '/');

  return { candidates: out, imports };
};

/** Resolve an import specifier to an existing repo-relative path (file or dir), or undefined. */
const resolveSource = (specifier: string | undefined): string | undefined => {
  if (!specifier) return undefined;
  let base: string;
  if (specifier.startsWith('packages/'))
    base = specifier; // vite/tsconfig alias -> frontend/web root
  else if (specifier.startsWith('.'))
    base = path.posix.join('packages/app', specifier); // relative to routes.tsx dir
  else return undefined; // node_modules etc.

  for (const candidate of [base, `${base}.tsx`, `${base}.ts`, `${base}/index.tsx`, `${base}/index.ts`]) {
    if (existsSync(path.join(ROOT, candidate))) return candidate;
  }
  return undefined;
};

/** The .tsx files to scan for a <Head> — the file itself, or every .tsx in a page dir. */
const headFilesFor = (source: string | undefined): string[] => {
  if (!source) return [];
  const abs = path.join(ROOT, source);
  if (statSync(abs).isDirectory()) {
    return readdirSync(abs)
      .filter((f) => f.endsWith('.tsx'))
      .map((f) => path.posix.join(source, f));
  }
  return [source];
};

/** Extract { title, description } from the first <Head> in `source` (repo-relative), or undefined. */
const readHead = (source: string): HeadMeta | undefined => {
  const src = ts.createSourceFile(
    source,
    ts.sys.readFile(path.join(ROOT, source)) ?? '',
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  let attrs: ts.JsxAttributes | undefined;
  const isHead = (el: ts.JsxOpeningElement | ts.JsxSelfClosingElement): boolean => el.tagName.getText(src) === 'Head';
  const visit = (node: ts.Node): void => {
    if (attrs) return;
    if (ts.isJsxSelfClosingElement(node) && isHead(node)) attrs = node.attributes;
    else if (ts.isJsxOpeningElement(node) && isHead(node)) attrs = node.attributes;
    else ts.forEachChild(node, visit);
  };
  visit(src);
  if (!attrs) return undefined;

  const found = attrs;
  const attr = (name: string): string | undefined => {
    const a = found.properties.find((p): p is ts.JsxAttribute => ts.isJsxAttribute(p) && p.name.getText(src) === name);
    if (!a?.initializer) return undefined;
    const init = a.initializer;
    if (ts.isStringLiteral(init)) return init.text;
    if (ts.isJsxExpression(init) && init.expression && ts.isStringLiteralLike(init.expression))
      return init.expression.text;
    return undefined; // non-literal (dynamic) — caller falls back
  };

  const title = attr('title');
  return title ? { title, description: attr('description') } : undefined;
};

/** Resolve a page's last-modified timestamp (W3C DATETIME, full ISO 8601) from git history. */
const lastmodFor = (source: string | undefined): string => {
  const spec = source ? `-- ${JSON.stringify(source)}` : '';
  try {
    const iso = execSync(`git log -1 --format=%aI ${spec}`, { cwd: ROOT, encoding: 'utf-8' }).trim();
    if (iso) return iso;
  } catch {
    /* fall through to HEAD */
  }
  try {
    return execSync('git log -1 --format=%aI', { cwd: ROOT, encoding: 'utf-8' }).trim();
  } catch {
    return new Date().toISOString();
  }
};

const xmlEscape = (s: string): string => s.replace(/[<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`);

const main = async (): Promise<void> => {
  const { candidates, imports } = parseRoutes();

  const pages: Page[] = candidates.map(({ url, component }) => {
    const source = resolveSource(component ? imports.get(component) : undefined);
    let head: HeadMeta | undefined;
    for (const file of headFilesFor(source)) {
      head = readHead(file);
      if (head) break;
    }
    return {
      url,
      source,
      title: head?.title ?? component ?? 'Cody Duong',
      description: head?.description,
    };
  });

  pages.sort((a, b) => (a.url === '/' ? -1 : b.url === '/' ? 1 : a.url.localeCompare(b.url)));
  for (const p of pages) console.log(`  ${p.url} — ${p.title}`);

  await fs.mkdir(CLIENT_DIR, { recursive: true });

  // sitemap.xml
  const urls = pages
    .map(({ url, source }) => {
      const loc = `${SITE_ORIGIN}${url === '/' ? '/' : url}`;
      return `  <url>\n    <loc>${xmlEscape(loc)}</loc>\n    <lastmod>${lastmodFor(source)}</lastmod>\n  </url>`;
    })
    .join('\n');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await fs.writeFile(path.join(CLIENT_DIR, 'sitemap.xml'), sitemap);

  // llms.txt
  const links = pages
    .map(({ url, title, description }) => `- [${title}](${SITE_ORIGIN}${url})${description ? ': ' + description : ''}`)
    .join('\n');
  const llms = `# Cody Duong\n\n> Cody Duong's personal website and portfolio.\n\n${LLMS_PREAMBLE}\n\n## Pages\n\n${links}\n`;
  await fs.writeFile(path.join(CLIENT_DIR, 'llms.txt'), llms);

  console.log(`\nGenerated sitemap.xml and llms.txt for ${pages.length} page(s) in ${CLIENT_DIR}`);
};

main().then(
  () => process.exit(0),
  (err: unknown) => {
    console.error(err);
    process.exit(1);
  },
);
