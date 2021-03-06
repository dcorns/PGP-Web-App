/**
 * gulpfile
 * Created by dcorns on 8/9/15.
 */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
var glob = require('glob');
var webpack = require('gulp-webpack');
var karma = require('gulp-karma');
var del = require('del');

gulp.task('connect', function(){
  connect.server({
    root:'build',
    port: '5000'
    });
});

gulp.task('webpack', function(){
  return gulp.src(glob.sync('app/js/**/*.js'))
    .pipe(webpack({
      output:{
        filename: 'bundle.js'
      }
    }))
      .pipe(gulp.dest('./build'));
});

gulp.task('webpackTests', function(){
  return gulp.src(glob.sync('test/**/*_test.js'))
    .pipe(webpack({
      output: {
        filename: 'testmain.js'
      }
    }))
    .pipe(gulp.dest('test'));
});

gulp.task('angularTests', ['webpackTests'], function(){
  return gulp.src(['test/testmain.js'])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
  //.on('error', function(err){
  //  throw err;
  //});
});

gulp.task('watch', function(){
  gulp.watch('app/**/*.js', ['webpack']);
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('app/index.html', ['copyBuild']);
  gulp.watch('app/views/**/*.html', ['copyBuild']);
});

gulp.task('sass', function(){
return sass(glob.sync('sass/**/*.scss'))
  .pipe(gulp.dest('./build/css/'))
});

gulp.task('angularTest', ['webpackTests'], function(){
return gulp.src(['test/testmain.js'])
  .pipe(karma({
    configfile: 'karma.conf.js',
    action: 'run'
  }));
});

gulp.task('cleanBuild', function(){
  del([
    'build/**/*'
  ])
});

gulp.task('copyBuild', function(){
  //return gulp.src(['app/index.html', 'app/img']).pipe(gulp.dest('./build'));
  return function(){
    gulp.src(['app/index.html', 'app/img']).pipe(gulp.dest('./build'));
    gulp.src(['app/img/**/*']).pipe(gulp.dest('./build/img'));
    gulp.src(['app/views/**/*']).pipe(gulp.dest('./build/views'));
  }();
});

gulp.task('default', ['connect', 'watch']);
gulp.task('unitTests', ['webpackTests', 'angularTests']);
gulp.task('buildDev', ['cleanBuild', 'copyBuild', 'webpack', 'sass']);
