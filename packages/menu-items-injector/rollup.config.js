import path from 'path';
import rollupBabel from 'rollup-plugin-babel';
import rollupJson from 'rollup-plugin-json';
import rollupUglify from 'rollup-plugin-uglify';
import rollupNodeResolve from 'rollup-plugin-node-resolve';
import rollupCommonjs from 'rollup-plugin-commonjs';

export default [generateBuild(), generateBuild({ cdn: true })];

function generateBuild({ cdn = false } = {}) {
  return {
    input: path.resolve(__dirname, 'src/index.js'),
    name: 'MenuItemsInjector',
    plugins: [
      rollupNodeResolve(),
      rollupCommonjs(),
      rollupJson(),
      rollupBabel({
        babelrc: false,
        presets: [
          [
            'env',
            {
              modules: false
            }
          ],
          'react'
        ],
        plugins: ['transform-export-extensions', 'transform-class-properties']
      }),
      ...(cdn ? [rollupUglify()] : [])
    ],
    sourcemap: true,
    output: [
      {
        file: path.resolve(
          __dirname,
          cdn ? 'cdn/menu-items-injector.min.js' : 'build/menu-items-injector.js'
        ),
        format: cdn ? 'umd' : 'cjs'
      }
    ]
  };
}
