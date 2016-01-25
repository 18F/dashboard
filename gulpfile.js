/* jshint node: true */

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

gulp.task('test', function() {
  return gulp.src('./tests/*_test.js', {read: false})
    // Reporters:
    // https://github.com/mochajs/mocha/blob/master/lib/reporters/index.js
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('lint', function() {
  return gulp.src(['deploy/*.js', './tests/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
