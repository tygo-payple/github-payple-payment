const gulp = require('gulp');
const concat = require('gulp-concat');
var sass = require("gulp-sass")(require('sass'));
const del = require('del');
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;
const fileinclude = require('gulp-file-include');
const uglify = require('gulp-uglify');
// const cleanCss = require("gulp-clean-css");

// 작업 경로 설정
const devSrc = 'src';
const devPaths = {
    js: devSrc + '/js/*.js',
    libJs: devSrc + '/js/lib/*.js',
    css: devSrc + '/scss/**/*.scss',
    html : devSrc + '/html/**/*.html',
    index : devSrc + '/index.html',
    image : devSrc + '/img/**/*',
    font : devSrc + '/fonts/**/*',
};

// 결과물 경로 설정
const distdSrc = 'dist'

// js - common
function copyJs() {
    return gulp.src(devPaths.js)
        /*
       .pipe(uglify()) 이미지 서버 반영시 주석 해제
        * */
        //
        .pipe(uglify())
        .pipe(concat('common.js'))
        .pipe(gulp.dest(distdSrc + '/js'));
}

// js - library
function copyLibJs() {
    let sourceLib = [
        'src/js/lib/jquery.min.js',
    ];
    return gulp.src(sourceLib)
        /*
        * .pipe(uglify()) 이미지 서버 반영시 주석 해제
        * */
        // .pipe(uglify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(distdSrc + '/js'));
}

// compile css
function compileScss() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        // .pipe(cleanCss({ compatibiliy: 'ie8' }))

        .pipe(gulp.dest(distdSrc + '/css'));
}

// html
function copyHtml() {
    return gulp.src(devPaths.html)
        .pipe(fileinclude())
        .pipe(gulp.dest(distdSrc + '/html'));
}

// index.html
function copyIndex() {
    return gulp.src(devPaths.index)
        .pipe(gulp.dest(distdSrc + '/'));
}

// fonts
function copyFonts() {
    return gulp.src(devPaths.font)
        .pipe(gulp.dest(distdSrc + '/fonts'));
}

// images
function copyImages() {
    return gulp.src(devPaths.image)
        .pipe(gulp.dest(distdSrc + '/img'));
}

// clean dist
function delDist() {
    return del('dist');
}

// clean include
function delInclude() {
    return del('dist/html/include');
}

// watch
function watch() {
    gulp.watch(devPaths.js, gulp.series(copyJs));
    gulp.watch(devPaths.css, gulp.series(compileScss));
    gulp.watch(devPaths.html, gulp.series(copyHtml));
    gulp.watch(devPaths.index, gulp.series(copyIndex));
    gulp.watch(devPaths.font, gulp.series(copyFonts));
    gulp.watch(devPaths.image, gulp.series(copyImages));
}

// server
function server() {
    browserSync.init({
        port: 2023,
        server: {
            baseDir: "./",
            index: "src/index.html"
        }
    });
    gulp.watch(devPaths.js, gulp.series(copyJs)).on("change", reload);
    gulp.watch(devPaths.css, gulp.series(compileScss)).on("change", reload);
    gulp.watch(devPaths.html, gulp.series(copyHtml)).on("change", reload);
    gulp.watch(devPaths.index, gulp.series(copyIndex)).on("change", reload);
    gulp.watch(devPaths.font, gulp.series(copyFonts)).on("change", reload);
    gulp.watch(devPaths.image, gulp.series(copyImages)).on("change", reload);
}

//task
gulp.task("dev", gulp.series(delDist, copyHtml, compileScss, copyLibJs, copyJs, copyFonts, copyImages, copyIndex, delInclude, server))
gulp.task("watch", gulp.series(watch))

exports.default = gulp.series("dev");
