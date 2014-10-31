var pkg = require('./package');

var minorVersion = pkg.version.replace(/\.(\d)*$/, '');
var majorVersion = pkg.version.replace(/\.(\d)*\.(\d)*$/, '');
var path = require('path');
var join = path.join;
var fs = require('fs');
var read = fs.readFileSync;

module.exports = function (grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    connect: {
      dev: {
        options: {
          hostname: '*',
          port: 8989,
          middleware: function (connect, options) {
            return [
              connect.static(__dirname),
              function routing(req, res, next) {
                if (!/^\/routing/.test(req.originalUrl)) return next();
                res.end(read(join(__dirname, 'example/routing.html')));
              },
              function standalone(req, res, next) {
                if (!/^\/standalone/.test(req.originalUrl)) return next();
                res.end(read(join(__dirname, 'example/standalone.html')));
              },
              function basic(req, res, next) {
                res.end(read(join(__dirname, 'example/index.html')));
              }
            ]
          }
        }
      },
    },
    watch: {
      dev: {
        files: ['*', 'lib/**/*'],
        tasks: ["shell:component_install", "shell:component_build"]
      }
    },
    clean: [
      'release/'
    ],

    shell: {
      component_install: {
        command: './node_modules/.bin/component-install'
      },
      component_install_dev: {
        command: './node_modules/.bin/component-install --dev'
      },
      component_build: {
        command: './node_modules/.bin/component-build --use component-stylus,component-jade'
      },
      component_build_dev: {
        command: './node_modules/.bin/component-build --dev --use component-stylus,component-jade'
      },
      component_build_release: {
        command: [
          './node_modules/.bin/component-build --use component-stylus,component-jade --out release',
          './node_modules/.bin/component-build --use component-stylus,component-jade,component-minify --out release --name build.min',
          './node_modules/.bin/component-build --use component-stylus,component-jade --out release --standalone WebHeader --name standalone',
          './node_modules/.bin/component-build --use component-stylus,component-jade,component-minify --out release --standalone WebHeader --name standalone.min'
        ].join(' && ')
      }
    },

    s3: {
      options: {
        key:    process.env.S3_KEY,
        secret: process.env.S3_SECRET,
        bucket: process.env.S3_BUCKET,
        access: 'public-read',
        headers: {
          'Cache-Control':  'public, max-age=300'
        }
      },
      clean: {
        del: [
          { src:     'web-header/' + pkg.version + '/build.css', },
          { src:     'web-header/' + pkg.version + '/build.js', },
          { src:     'web-header/' + pkg.version + '/build.min.css', },
          { src:     'web-header/' + pkg.version + '/build.min.js', },
          { src:     'web-header/' + pkg.version + '/standalone.css', },
          { src:     'web-header/' + pkg.version + '/standalone.js', },
          { src:     'web-header/' + pkg.version + '/standalone.min.css', },
          { src:     'web-header/' + pkg.version + '/standalone.min.js', },
          { src:     'web-header/latest/build.css', },
          { src:     'web-header/latest/build.js', },
          { src:     'web-header/latest/build.min.css', },
          { src:     'web-header/latest/build.min.js', },
          { src:     'web-header/latest/standalone.css', },
          { src:     'web-header/latest/standalone.js', },
          { src:     'web-header/latest/standalone.min.css', },
          { src:     'web-header/latest/standalone.min.js', },
        ]
      },
      publish: {
        upload: [{
          rel:    'release',
          src:    'release/**/*',
          dest:   'web-header/' + pkg.version + '/',
          options: { gzip: false }
        }, {
          rel:    'release',
          src:    'release/*',
          dest:   'web-header/latest/',
          options: { gzip: false }
        }]
      }
    },
    maxcdn: {
      purgeCache: {
        options: {
          companyAlias:   process.env.MAXCDN_COMPANY_ALIAS,
          consumerKey:    process.env.MAXCDN_CONSUMER_KEY,
          consumerSecret: process.env.MAXCDN_CONSUMER_SECRET,
          zone_id:        process.env.MAXCDN_ZONE_ID,
          method:         'delete'
        },
        files: [
          { dest:     'web-header/' + pkg.version + '/build.css', },
          { dest:     'web-header/' + pkg.version + '/build.js', },
          { dest:     'web-header/' + pkg.version + '/build.min.css', },
          { dest:     'web-header/' + pkg.version + '/build.min.js', },
          { dest:     'web-header/' + pkg.version + '/standalone.css', },
          { dest:     'web-header/' + pkg.version + '/standalone.js', },
          { dest:     'web-header/' + pkg.version + '/standalone.min.css', },
          { dest:     'web-header/' + pkg.version + '/standalone.min.js', },
          { dest:     'web-header/latest/build.css', },
          { dest:     'web-header/latest/build.js', },
          { dest:     'web-header/latest/build.min.css', },
          { dest:     'web-header/latest/build.min.js', },
          { dest:     'web-header/latest/standalone.css', },
          { dest:     'web-header/latest/standalone.js', },
          { dest:     'web-header/latest/standalone.min.css', },
          { dest:     'web-header/latest/standalone.min.js', },
        ],
      },
    }
  });

  grunt.registerTask('dev', ['shell:component_install_dev', 'shell:component_build_dev', 'connect', 'watch'])
  grunt.registerTask('build', ['clean', 'shell:component_install', 'shell:component_build_release']);
  grunt.registerTask('cdn', ['build', 's3', 'maxcdn']);
  grunt.registerTask('default', ['build']);
}
