const gulp = require('gulp');
var sass = require("gulp-sass")(require('sass'));

const devPaths = {
    css: 'pagelist/scss/*.scss',
};

const pagelist = 'pagelist'

function copyCss() {
    return gulp.src(devPaths.css)
        .pipe(sass())
        .pipe(gulp.dest(pagelist + '/css'));
}

function watch() {
    gulp.watch('pagelist/scss/**/*.scss', gulp.series(copyCss));
}

gulp.task("pagelist-dev", gulp.series(copyCss, watch))
