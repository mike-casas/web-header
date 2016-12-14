const pkg = require('./package');
const matchdep = require('matchdep');

module.exports = (grunt) => {
  matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    shell: {
      purge_cdn: {
        command: [
          'curl -X DELETE https://cdn.auth0.com/web-header/latest',
          `curl -X DELETE https://cdn.auth0.com/web-header/${pkg.version}`
        ].join(' && ')
      }
    },

    aws_s3: {
      options: {
        key: process.env.S3_KEY,
        secret: process.env.S3_SECRET,
        bucket: process.env.S3_BUCKET,
        region: process.env.S3_REGION,
        access: 'public-read',
        headers: {
          'Cache-Control': 'public, max-age=300'
        }
      },
      clean: {
        files: [
          { action: 'delete', dest: `web-header/${pkg.version}/web-header.css` },
          { action: 'delete', dest: `web-header/${pkg.version}/web-header.js` },
          { action: 'delete', dest: 'web-header/latest/web-header.css' },
          { action: 'delete', dest: 'web-header/latest/web-header.js' }
        ]
      },
      publish: {
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['**'],
          dest: `web-header/${pkg.version}/`
        }, {
          expand: true,
          cwd: 'dist/',
          src: ['**'],
          dest: 'web-header/latest/'
        }]
      }
    }
  });

  grunt.registerTask('cdn', ['aws_s3', 'shell:purge_cdn']);
  grunt.registerTask('default', ['cdn']);
};
