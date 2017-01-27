var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
  gulp.src('src/assets/styles/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/'));
});

// Watch task
gulp.task('default', function() {
  gulp.watch('src/assets/styles/sass/**/*.scss', ['styles']);
});
