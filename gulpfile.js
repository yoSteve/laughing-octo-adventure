var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var header = require('gulp-header');
var nodemon = require('gulp-nodemon');

//var plugins = gulpLoadPlugins({
//  pattern:'gulp-',
//  config: 'package.json',
//  scope: ['devDependencies'],
//  replaceString: 'gulp',
//  camelize: true,
//  lazy: true
//});;

gulp.task('start', function() {
  nodemon({ script: 'app.js',
    ext: 'js jade html',
    env: { 'NODE_ENV': 'development' },
    tasks: ['lint'],
    execMap: { js:'node --harmony' }
  });
});

  

gulp.task('lint', function() {
  return gulp.src('*.js')
                       .pipe(jshint())
                       .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  var headerValue = "Evaluated by gulp.\n";
  return gulp.src('js/*.js')
    .pipe(concat('combined.js'))
    .pipe(header(headerValue))
    .pipe(gulp.dest('dist'))
    .pipe(rename('combined.min.js'))
    .pipe(uglify())
    .pipe(header(headerValue))
    .pipe(gulp.dest('dist'));
});
