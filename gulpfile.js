var clean               = require('gulp-clean');
var concat              = require('gulp-concat');
var connect             = require('gulp-connect');
var gulp                = require('gulp');
var jade                = require('gulp-jade');
var minifyCSS           = require('gulp-minify-css');
var minifyHTML          = require('gulp-minify-html');
var open                = require('gulp-open');
var runSequence         = require('run-sequence');
var sass                = require('gulp-ruby-sass');
var autoprefixer        = require('gulp-autoprefixer');
var sourcemaps          = require('gulp-sourcemaps');
var data                = require('gulp-data');
var fs                  = require('fs');
var cson                = require('gulp-cson');



/**
* Set all basic informations
*/
var config = {

  folders: {
    base: './app/',
    dist: './.dist/',
    tmp: './.tmp/'
  },

  files: {
    index: 'index',
    config: 'template'
  },

  connection: {
    port: 9000,
    livereload: false
  },

  sass: {
    autoprefixer: ['last 3 versions']
  }
}



/**
* Clean up dist folder
*/
gulp.task('cleanDist', function() {
  return gulp.src(config.folders.dist)
    .pipe(clean());
});



/**
* Clean up tmp folder
*/
gulp.task('cleanTMP', function() {
  return gulp.src(config.folders.tmp)
    .pipe(clean());
});



/**
* Compile Jade to HTML
*
* @require: compiled template-CSON file in JSON
*/
gulp.task('renderHTML', ['compileCSON'], function() {
  return gulp.src(config.folders.base + config.files.index + '.jade')
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync(config.folders.tmp + config.files.config + '.json'));
    }))
    .pipe(jade())
    .pipe(gulp.dest(config.folders.dist))
    .pipe(connect.reload());
});


/**
* Compile template-CSON to JSON
*/
gulp.task('compileCSON', function() {
  return gulp.src(config.folders.base + config.files.config + '.cson')
    .pipe(cson())
    .pipe(gulp.dest(config.folders.tmp));
});



/**
* Render Css Code with
* Autoprefixer and Minifier
*/
gulp.task('renderCSS', function() {
  return sass(config.folders.base + '/sass/')
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(autoprefixer({
      browsers: config.sass.autoprefixer,
      cascade: false,
      remove: true
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(config.folders.dist + '/css/'))
    .pipe(connect.reload());
});



/**
* Open browser window with localhost
*/
gulp.task('open-browser', function(){
  var options = {
    url: 'http://localhost:' + config.connection.port
  };
  gulp.src(config.folders.dist + '/index.html')
    .pipe(open('', options));
});



/**
 * Start Connection to local server
 */
gulp.task('connect', function() {
 return connect.server({
   root: [config.folders.dist],
   port: config.connection.port,
   livereload: config.connection.livereload
 });
});



/**
 * Watcher
 */
gulp.task('watch', function () {
  gulp.watch([config.folders.base + '/**/*.jade'], ['renderHTML']);
  gulp.watch([config.folders.base + '/sass/**/*.sass'], ['renderCSS']);
  gulp.watch([config.folders.base + '/' + config.files.config + '.cson'], ['renderHTML']);
});



/**
 * Build all stuff for localhost connect
 */
gulp.task('build', function(callback) {
 runSequence('cleanDist',
             'cleanTMP',
             'renderHTML',
             'renderCSS',
             'connect',
             'open-browser',
             'watch',
             callback);
});



/**
* Default Task
*/
gulp.task('default', ['build']);
