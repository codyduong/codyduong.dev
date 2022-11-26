'use strict';

/** https://github.com/NickCis/razzle-plugin-firebase/blob/master/index.js */
/* eslint-disable @typescript-eslint/no-var-requires */

const os = require('os');
const fs = require('fs');
const path = require('path');
const child = require('child_process');
const CopyPlugin = require('copy-webpack-plugin');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

function toArray(e) {
  if (Array.isArray(e)) return e;
  return [e];
}

const DefaultOptions = {
  pkg: 'package.json',
  firebase: 'firebase.json',
  target: '',
  exec: false,
  start: 'emulators:start',
  serverIndex: 'index.js',
};

function modifyWebpackConfig({
  env: { target, dev },
  webpackConfig: config,
  webpackObject: webpack,
  options: { pluginOptions: opts },
  paths,
}) {
  if (target === 'node') {
    const options = Object.assign({}, DefaultOptions, opts || {});
    const pkg = require(resolveApp(options.pkg));
    const firebase = require(resolveApp(options.firebase));
    const hosting = options.target
      ? firebase.hosting.find(({ target }) => target === options.target)
      : firebase.hosting;
    const functions = firebase.functions || {};

    // Correct servers output
    // config.output.filename = options.serverIndex || 'index.js';
    // config.output.path = resolveApp(functions.source || 'functions');

    // Add functions/package.json
    const functionsPkg = JSON.stringify({
      name: `${pkg.name}-functions`,
      version: pkg.version,
      private: true,
      dependencies: pkg.dependencies,
      engines: pkg.engines,
    });

    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.emit.tapAsync(
          'razzle-plugin-firebase',
          (compilation, callback) => {
            compilation.assets['package.json'] = {
              source: () => functionsPkg,
              size: () => functionsPkg.length,
            };
            callback();
          }
        );
      },
    });

    if (dev) {
      for (const key of Object.keys(config.entry)) {
        // Remove hmr
        config.entry[key] = config.entry[key].filter(
          (e) => !e.includes('webpack/hot/poll')
        );
        config.entry[key].unshift('source-map-support/register');
      }

      // No start server on dev and remove hmr
      // config.plugins = config.plugins.filter(
      //   (plugin) =>
      //     !['StartServerPlugin', 'HotModuleReplacementPlugin'].includes(
      //       plugin.constructor.name
      //     )
      // );

      // Copy public file to the one firebase emulator will use
      const publicFolder = resolveApp(hosting.public || 'public');
      if (paths.appPublic !== publicFolder) {
        config.plugins.push(
          new CopyPlugin([
            {
              from: paths.appPublic,
              to: publicFolder,
            },
          ])
        );
      }

      let proc;
      const firebaseBin = require.resolve(
        path.join(
          'firebase-tools',
          require('firebase-tools/package.json').bin.firebase
        )
      );
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.done.tapAsync(
            'razzle-plugin-firebase',
            (compilation, callback) => {
              if (!proc) {
                if (os.platform() === 'win32' || options.exec) {
                  proc = child.exec(
                    ['node', firebaseBin, ...toArray(options.start)].join(' '),
                    (error) => {
                      if (error) throw error;
                    }
                  );

                  proc.stdout.pipe(process.stdout);
                  proc.stderr.pipe(process.stderr);
                } else {
                  proc = child.spawn(
                    'node',
                    [firebaseBin, ...toArray(options.start)],
                    {
                      stdio: 'inherit',
                    }
                  );

                  proc.on('close', (error) => {
                    if (error) throw error;
                  });
                }
              }

              callback();
            }
          );
        },
      });
    }
  }

  return config;
}

module.exports = { modifyWebpackConfig };
