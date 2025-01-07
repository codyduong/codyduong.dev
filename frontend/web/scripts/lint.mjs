/**
 * @author Cody Duong <cody.qd@gmail.com>
 * @license MIT
 * @file This script only lints the changed files using git diff. It is useful in large projects
 *       to avoid checking unnecessary files, where we assume files not changed already conform.
 */
import { execSync } from "child_process";
import chalk from "chalk";
import path from "path";

const WORKSPACE = "frontend/web/";

try {
  const isCI = process.env.CI === "true";
  const isPR = process.env.GITHUB_EVENT_NAME === "pull_request";
  const baseBranch = process.env.GITHUB_BASE_REF;
  const currentSHA = process.env.GITHUB_SHA;

  let diffCommand;

  if (isCI) {
    if (isPR) {
      console.log("Detected PR in GitHub Actions: Checking changes from base branch...");
      diffCommand = `git diff --name-only ${baseBranch}...${currentSHA} --diff-filter=ACMRTUXB`;
    } else {
      console.log("Detected push to main branch in GitHub Actions: Checking the latest commit...");
      diffCommand = `git diff --name-only HEAD~1 --diff-filter=ACMRTUXB`;
    }
  } else {
    console.log("Detected local environment: Checking staged, unstaged, and untracked files...");
    diffCommand = `git diff --name-only --diff-filter=ACMRTUXB && git ls-files --others --exclude-standard`;
  }

  console.log(chalk.gray(`$ ${diffCommand}`))
  let changedFiles = execSync(diffCommand, { encoding: "utf-8" })
    .split("\n")
    .filter((file) => /\.(ts|tsx?)$/.test(file))
    .map((file) => path.relative(WORKSPACE, file))
    .join(" ");

  if (changedFiles.trim() === "") {
    console.log("There are no files to lint");
  } else {
    const eslintCommand = `bun eslint --config eslint.config.js ${changedFiles}`;
    console.log(chalk.gray(`$ ${eslintCommand}`))
    execSync(eslintCommand, { stdio: "inherit" });
  }
} catch (err) {
  console.error(err);
  process.exit(1)
}