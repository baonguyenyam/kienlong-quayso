var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var prettify = require('gulp-html-prettify');
var htmlmin = require('gulp-html-minifier');

gulp.task('htmlmin', function () {
  gulp.src('./*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./'))
});

// Set the banner content
var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function () {

  // Bootstrap
  gulp.src([
    './node_modules/bootstrap/dist/**/*',
    '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
    '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
  ])
    .pipe(gulp.dest('./vendor/bootstrap'))

  // Font Awesome
  gulp.src([
    './node_modules/font-awesome/**/*',
    '!./node_modules/font-awesome/{less,less/*}',
    '!./node_modules/font-awesome/{scss,scss/*}',
    '!./node_modules/font-awesome/.*',
    '!./node_modules/font-awesome/*.{txt,json,md}'
  ])
    .pipe(gulp.dest('./vendor/font-awesome'))

  gulp.src([
    './node_modules/popper.js/dist/**/*'
  ])
    .pipe(gulp.dest('./vendor/popper.js'))

  // jQuery
  gulp.src([
    './node_modules/jquery/dist/*',
    '!./node_modules/jquery/dist/core.js'
  ])
    .pipe(gulp.dest('./vendor/jquery'))

  // jQuery Easing
  gulp.src([
    './node_modules/jquery.easing/*.js'
  ])
    .pipe(gulp.dest('./vendor/jquery-easing'))

  // Magnific Popup
  gulp.src([
    './node_modules/magnific-popup/dist/*'
  ])
    .pipe(gulp.dest('./vendor/magnific-popup'))

  // Scrollreveal
  gulp.src([
    './node_modules/scrollreveal/dist/*.js'
  ])
    .pipe(gulp.dest('./vendor/scrollreveal'))

});

// Compile SCSS
gulp.task('css:compile', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function () {
  return gulp.src([
    './css/*.css',
    '!./css/*.min.css'
  ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

// CSS
gulp.task('css', ['css:compile', 'css:minify']);

// Minify JavaScript
gulp.task('js:minify', function () {
  return gulp.src([
    './js/*.js',
    '!./js/*.min.js'
  ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream());
});
// Concat JavaScript
gulp.task('js:app', function () {
  return gulp.src([
    'vendor/jquery/jquery.min.js',
    'vendor/TweenMax.min.js',
    'vendor/underscore-min.js',
  ])
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('./js'))
  // .pipe(browserSync.stream());
});
gulp.task('js:concat', function () {
  return gulp.src([
    'vendor/popper.js/umd/popper.min.js',
    'vendor/bootstrap/js/bootstrap.bundle.min.js',
    'vendor/jquery-easing/jquery.easing.min.js',
    'vendor/offline/offline.min.js',
    'vendor/kAnimation.min.js',
    './js/congrat.js',
    './js/creative.js',

  ])
    .pipe(concat('canhcam.js'))
    .pipe(gulp.dest('./js'))
    // .pipe(browserSync.stream());
});


gulp.task('prettify', function () {
  gulp.src('./*.html')
    .pipe(prettify({ indent_char: ' ', indent_size: 2 }))
    .pipe(gulp.dest('./'))
});

// JS
gulp.task('js', ['js:app', 'js:concat', 'js:minify']);

// Default task
gulp.task('default', ['css', 'js', 'vendor', 'htmlmin']);

// Configure the browserSync task
gulp.task('browserSync', ['css', 'js', 'vendor'], function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Dev task
gulp.task('dev', ['css', 'js', 'prettify', 'browserSync'], function () {
  gulp.watch('./scss/*.{scss,sass}', ['css']);
  gulp.watch(['./js/*.js', '!./js/*.min.js'], ['js:minify']);
  gulp.watch('./*.html', browserSync.reload);
});
