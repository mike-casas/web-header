import gulp from 'gulp';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import commonConfig from './tools/webpack.common.config';
import universalConfig from './tools/webpack.universal.config';
import browserConfig from './tools/webpack.browser.config';
import playgroundConfig from './tools/webpack.playground.config';
import browserSync from 'browser-sync';

gulp.task('dev', () => {
  const bundler = webpack(playgroundConfig);
  const bs = browserSync.create();

  bs.init({
    server: {
      baseDir: 'dist',

      middleware: [
        webpackDevMiddleware(bundler, {
          // IMPORTANT: dev middleware can't access config, so we should
          // provide publicPath by ourselves
          publicPath: playgroundConfig.output.publicPath,

          // pretty colored output
          stats: { colors: true }

          // for other settings see
          // http://webpack.github.io/docs/webpack-dev-middleware.html
        }),

        // bundler should be the same as above
        webpackHotMiddleware(bundler)
      ]
    }
  });
});

gulp.task('build', () =>
  Promise.all([
    bundle(universalConfig),
    bundle(browserConfig)
  ])
    .then(stats => {
      stats.forEach(stat => {
        console.log(stat.toString(commonConfig.stats));
      });
    })
    .catch(err => {
      console.log(err);
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
