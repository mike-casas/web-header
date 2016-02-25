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
            ];
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
      },
      purge_cdn: {
        command: [
          'curl -X DELETE https://cdn.auth0.com/web-header/latest',
          'curl -X DELETE https://cdn.auth0.com/web-header/' + pkg.version
        ].join(' && ')
      }
    },

    aws_s3: {
      options: {
        key:    process.env.S3_KEY,
        secret: process.env.S3_SECRET,
        bucket: process.env.S3_BUCKET,
        region: process.env.S3_REGION,
        access: 'public-read',
        headers: {
          'Cache-Control':  'public, max-age=300'
        }
      },
      clean: {
        files: [
          { action: 'delete', dest: 'web-header/' + pkg.version + '/build.css', },
          { action: 'delete', dest: 'web-header/' + pkg.version + '/build.js', },
          { action: 'delete', dest: 'web-header/' + pkg.version + '/build.min.css', },
          { action: 'delete', dest: 'web-header/' + pkg.version + '/build.min.js', },
          { action: 'delete', dest: 'web-header/' + pkg.version + '/standalone.css', },
          { action: 'delete', dest: 'web-header/' + pkg.version + '/standalone.js', },
          { action: 'delete', dest: 'web-header/' + pkg.version + '/standalone.min.css', },
          { action: 'delete', dest: 'web-header/' + pkg.version + '/standalone.min.js', },
          { action: 'delete', dest: 'web-header/latest/build.css', },
          { action: 'delete', dest: 'web-header/latest/build.js', },
          { action: 'delete', dest: 'web-header/latest/build.min.css', },
          { action: 'delete', dest: 'web-header/latest/build.min.js', },
          { action: 'delete', dest: 'web-header/latest/standalone.css', },
          { action: 'delete', dest: 'web-header/latest/standalone.js', },
          { action: 'delete', dest: 'web-header/latest/standalone.min.css', },
          { action: 'delete', dest: 'web-header/latest/standalone.min.js', },
        ]
      },
      publish: {
        files: [{
          expand: true,
          cwd:    'release/',
          src:    ['**'],
          dest:   'web-header/' + pkg.version + '/'
        }, {
          expand: true,
          cwd:    'release/',
          src:    ['**'],
          dest:   'web-header/latest/'
        }]
      }
    }
  });

  grunt.registerTask('dev', ['shell:component_install_dev', 'shell:component_build_dev', 'connect', 'watch']);
  grunt.registerTask('build', ['clean', 'shell:component_install', 'shell:component_build_release']);
  grunt.registerTask('cdn', ['build', 's3', 'shell:purge_cdn']);
  grunt.registerTask('default', ['build']);
};
