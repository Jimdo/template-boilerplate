var autoprefixer        = require('gulp-autoprefixer');
var clean               = require('gulp-clean');
var clone               = require('gulp-clone')
var concat              = require('gulp-concat');
var connect             = require('gulp-connect');
var cson                = require('gulp-cson');
var data                = require('gulp-data');
var fs                  = require('fs');
var gulp                = require('gulp');
var gulpif              = require('gulp-if');
var jade                = require('gulp-jade');
var livereload          = require('gulp-livereload');
var minifyCSS           = require('gulp-minify-css');
var minifyHTML          = require('gulp-minify-html');
var open                = require('gulp-open');
var rename              = require('gulp-rename');
var runSequence         = require('run-sequence');
var sass                = require('gulp-ruby-sass');
var sourcemaps          = require('gulp-sourcemaps');



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
    port: 8080
  },

  sass: {
    autoprefixer: ['last 3 versions'],
    minified: true
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
    .pipe(livereload());
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
    .pipe(gulpif(config.sass.minified, minifyCSS()))
    .pipe(gulpif(config.sass.minified, rename({suffix: ".min"})))
    .pipe(gulp.dest(config.folders.dist + '/css/'))
    .pipe(livereload());
});



/**
* Clone kickstarter into dist folder
*/
gulp.task('kickstarter', function() {
  return gulp.src(config.folders.base + 'kickstarter.json')
    .pipe(clone())
    .pipe(gulp.dest(config.folders.dist))
    .pipe(livereload());
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
   port: config.connection.port
 });
});



/**
 * Watcher
 */
gulp.task('watch', function () {
  livereload({ start: true });
  gulp.watch([config.folders.base + '**/*.jade'], ['renderHTML']);
  gulp.watch([config.folders.base + 'sass/**/*.sass', config.folders.base + '/sass/**/*.scss'], ['renderCSS']);
  gulp.watch([config.folders.base + config.files.config + '.cson'], ['renderHTML']);
  gulp.watch([config.folders.base + 'kickstarter.json'], ['kickstarter']);
});



/**
 * Build all stuff for localhost connect
 */
gulp.task('build', function(callback) {
 runSequence('cleanDist',
             'cleanTMP',
             'renderHTML',
             'renderCSS',
             'kickstarter',
             'connect',
             'open-browser',
             'watch',
             callback);
});



/**
* Default Task
*/
gulp.task('default', ['build']);
