var gulp = require('gulp');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var stylus = require("gulp-stylus");
// var del = require('del');

var paths = {
  scripts: './develop/js/*.js',
  images: './develop/image/*',
  stylus: "./develop/stylus/*.styl",
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
// gulp.task('clean', function() {
//   // You can use multiple globbing patterns as you would with `gulp.src`
//   return del(['']);
// });

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
      .pipe(uglify()).pipe(gulp.dest('./project/js'));
});

// Copy all static images
gulp.task('images', function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('./project/image'));
});
gulp.task('stylus', function() {
  return gulp.src(paths.stylus)
    // Pass in options to the task
    .pipe(stylus({compress:true}))
    .pipe(gulp.dest('./project/css'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.stylus, ['stylus']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'images',"stylus"]);