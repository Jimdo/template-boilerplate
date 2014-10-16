module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // CSS
    sass: {
      dist: {
        options: {
          style: 'expanded',
          lineNumbers: true,
          bundleExec: true,
          compass: true,
          sourcemap: true

        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['**/*.sass'],
          dest: 'css',
          ext: '.css'
        }],
      }
    },

    cssmin: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css', '!*.min.css'],
          dest: 'css',
          ext: '.min.css'
        }]
      }
    },

    csslint: {
      kompilat: {
        options: {
          csslintrc: '.csslintrc'
        },
        src: [
          'css/**/*.css',
          '!css/**/*.min.css'
        ]
      }
    },

    // WATCH
    watch: {
      sass: {
        files: 'sass/**/*.sass',
        tasks: [
          'sass'
          ],
        options: {
        }
      },
      watch_build_css: {
        files: [
          'css/**/*.css'
        ],
        options: {
          livereload: true
        },
        tasks: [
        'cssmin',
        'csslint:kompilat'
        ]
      }
    },

    // SERVER
    connect: {
      server: {
        options: {
          port: 8080,
          base: './',
          open: true
        }
      }
    },

    // CONCURRENT FOR WATCH AND SERVE
    concurrent: {
      watch_serve_reload: ['server', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  });

  grunt.registerTask('inital_compile', [ 'sass',  'csslint:kompilat', 'cssmin' ]);
  grunt.registerTask('server', [ 'connect:server:keepalive' ]);
  grunt.registerTask('default', [ 'inital_compile', 'concurrent:watch_serve_reload' ]);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
};
