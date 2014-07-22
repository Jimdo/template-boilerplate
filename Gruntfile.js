module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    // COMPILE TASKS
    // coffee: {
    //   glob_to_multiple: {
    //     expand: true,
    //     // flatten: true,
    //     cwd: 'src/',
    //     src: ['**/*.coffee'],
    //     dest: 'dev',
    //     ext: '.js',
    //   },
    // },
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
          cwd: 'src',
          src: ['**/*.sass'],
          dest: 'dev',
          ext: '.css'
        }],
      }
    },
    // jade: {
    //   compile: {
    //     options: {
    //       pretty: true
    //     },
    //     files: [ {
    //       cwd: 'src',
    //       dest: 'dev',
    //       expand: true,
    //       src: '**/*.jade',
    //       ext: '.html',
    //     } ]
    //   }
    // },

    // COPY TASKS
    // font awesomesome example in commit fc820d0
    // copy: {

    //   bower_components: {
    //   // bower components need to be available
    //   // TODO: instead set install path to dev with .bowerrc
    //     expand: true,
    //     cwd: 'bower_components',
    //     dest: 'dev/bower_components',
    //     src: '**/*',
    //   }

    // },


    // WATCH
    watch: {

      // html: {
      //   files: ['src/**/*.html'],
      //   tasks: ['copy:html'],
      // },

      // jade: {
      //   files: ['src/**/*.jade'],
      //   tasks: ['jade'],
      // },

      // coffee: {
      //   files: [ 'src/**/*.coffee' ],
      //   tasks: [ 'coffee' ],
      // },

      sass: {
        files: 'src/**/*.sass',
        tasks: [
          'sass',
          // 'csscomb:sass',
          'csslint:kompilat'
          ],
        options: {
          debounceDelay: 5000
        }
      },

      // watch_build: {
      //   files: [
      //     'dev/**/*.html',
      //     'dev/**/*.js'
      //   ],
      //   options: {
      //     livereload: true,
      //   },
      // },
      watch_build_css: {
        files: [
          'css/**/*.css'
        ],
        options: {
          livereload: true
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 3000,
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
    },

    // csscomb: {
    //     sass: {
    //         expand: true,
    //         cwd: 'src',
    //         src: ['**/*.sass'],
    //         dest: 'src',
    //         ext: '.sass'
    //     }
    // },

    csslint: {
      kompilat: {
        options: {
          csslintrc: '.csslintrc'
        },
        src: [
          'css/**/*.css'
          // '!dev/bower_components/**/*.css'
          ]
      }
    }

  });

  grunt.registerTask(
    'inital_compile', [
       'sass'
       // 'jade',
       // 'coffee',
       // 'copy'
        ]
  );

  grunt.registerTask('server', [ 'connect:server:keepalive' ]);
  grunt.registerTask('default', [ 'inital_compile', 'concurrent:watch_serve_reload' ]);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-concurrent');
  // grunt.loadNpmTasks('grunt-contrib-jade');
  // grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-coffee');
  // grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-contrib-csslint');
};
