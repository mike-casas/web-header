import rollupBabel from 'rollup-plugin-babel';
import rollupJson from 'rollup-plugin-json';
import rollupUglify from 'rollup-plugin-uglify';
import rollupNodeResolve from 'rollup-plugin-node-resolve';
import rollupCommonjs from 'rollup-plugin-commonjs';

export default [generateBuild(), generateBuild({ cdn: true })];

function generateBuild({ cdn = false } = {}) {
  return {
    input: 'src/index.js',
    name: 'MenuItemsInjector',
    plugins: [
      rollupNodeResolve(),
      rollupCommonjs(),
      rollupJson(),
      rollupBabel(),
      ...(cdn ? [rollupUglify()] : [])
    ],
    sourcemap: true,
    output: [
      {
        file: cdn ? 'cdn/menu-items-injector.min.js' : 'build/menu-items-injector.js',
        format: cdn ? 'umd' : 'cjs'
      }
    ]
  };
}
