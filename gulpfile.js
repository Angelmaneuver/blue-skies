'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
// const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

gulp.task('sass', () => {
  return (
    gulp
      .src('./src/includes/stylesheet/*.scss')
      .pipe(
        plumber({
          errorHandler: notify.onError('Sass Error: <%= error.message %>'),
        })
      )
      // .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(gulp.dest('./src/includes/stylesheet'))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(cleanCss())
      // .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./src/includes/stylesheet'))
  );
});

gulp.task('watch', () => {
  gulp.watch('./src/includes/stylesheet/*.scss', gulp.task('sass'));
});

gulp.task('default', gulp.task('watch'));
