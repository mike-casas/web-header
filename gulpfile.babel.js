import gulp from 'gulp';
import webpack from 'webpack';
import commonConfig from './tools/webpack.common.config';
import moduleConfig from './tools/webpack.module.config';

/**
 * Create bundles: universal bundle and browser-only bundle
 */
gulp.task('build', () =>
  Promise.all([
    bundle(moduleConfig)
  ])
    .then((stats) => {
      stats.forEach((stat) => {
        console.log(stat.toString(commonConfig.stats));
      });
    })
    .catch((err) => {
      throw err;
    })
);

function bundle(config) {
  return new Promise((resolve, reject) => {
    webpack(config).run((err, stats) => {
      if (err) {
        return reject(err);
      }

      return resolve(stats);
    });
  });
}
