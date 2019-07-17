const gulp = require('gulp');
const svgStore = require('gulp-svgstore');
const svgMin = require('gulp-svgmin');
const rename = require('gulp-rename');

function svgSpriteTask(cb) {
  gulp
    .src('src/assets/svg/icons/*.svg')
    .pipe(rename({ prefix: 'endpass-ui-icon-' }))
    .pipe(svgMin())
    .pipe(svgStore({ inlineSvg: true }))
    .pipe(gulp.dest('src/assets/svg'));
  cb();
}

gulp.task('svg', svgSpriteTask);
