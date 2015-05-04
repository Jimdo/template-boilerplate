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



/**
* Clean up .dist folder
*/
gulp.task('clean', function() {
  return gulp.src('./.dist/')
    .pipe(clean());
});


/**
* Compile Jade to HTML
* Minify code for production
*/
gulp.task('production-html', function() {
  return gulp.src('./app/*.jade')
    .pipe(jade({pretty: true}))
    .pipe(minifyHTML())
    .pipe(gulp.dest('./.dist/'));
});


/**
* Compile Jade to HTML for localhost connect
*/
gulp.task('dev-html', function() {
  return gulp.src('./app/*.jade')
    .pipe(jade({
      data: {
        title: 'About Me',
        name: 'Michael Coleman', // use your own name, this one is mine :P
        portrait: 'url to a pic of you', // more on this in a bit
        github: 'https://github.com/Coalman', // use your own github url
        email: 'your email address'
      }
    }))
    .pipe(gulp.dest('./.dist/'))
    .pipe(connect.reload());
});


/**
* Compile Sass Code and concat to application.css
* Autoprefixer
* Building process
*/
gulp.task('production-css', function() {
  return sass('./app/sass/')
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false,
      remove: true
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./.dist/css/'));
});


/**
* Compile Sass Code and concat to application.css
* Autoprefixer
* Server process
*/
gulp.task('dev-css', function() {
  return sass('./app/sass/')
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false,
      remove: true
    }))
    .pipe(gulp.dest('./.dist/css/'))
    .pipe(connect.reload());
});



/**
 * Build all stuff for localhost connect
 */
gulp.task('dev', function(callback) {
 runSequence('clean',
             'dev-html',
             'dev-css',
             'connect',
             'open-browser',
             'watch',
             callback);
});



/**
 * Build all stuff for localhost connect
 */
gulp.task('production', function(callback) {
 runSequence('clean',
             'production-html',
             'production-css',
             'connect',
             'open-browser',
             'watch',
             callback);
});


/**
* Open browser window with localhost
*/
gulp.task('open-browser', function(){
  var options = {
    url: 'http://localhost:9000'
  };
  gulp.src('./.dist/index.html')
    .pipe(open('', options));
});


/**
 * Start Connection to local server
 */
gulp.task('connect', function() {
 return connect.server({
   root: ['.dist'],
   port: 9000,
   livereload: true
 });
});


/**
 * Watcher
 */
gulp.task('watch', function () {
  gulp.watch(['./app/**/*.jade'], ['dev-html']);
  gulp.watch(['./app/sass/**/*.sass'], ['dev-css']);
});


/**
* Default Task
*/
gulp.task('default', ['dev']);
