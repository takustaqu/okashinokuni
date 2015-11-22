var gulp = require("gulp");

var sass = require("gulp-sass")
var pleeease = require("gulp-pleeease")
var browserSync = require("browser-sync");

var DEV = "yuinyan/public/",
    PUBLIC = "yuinyan/public/";
    WEBROOT = "yuinyan/public/"

//style
gulp.task("style", function() {
    gulp.src(WEBROOT + "/sass/**/*.scss")
        .pipe(sass({
            style:"nested",
            includePaths:WEBROOT+"/sass/common",
            compass : true,
            "sourcemap=none": true,
            minifier: false,
        }))
        .pipe(pleeease({
            fallbacks: {
                autoprefixer: ["last 2 version", "ie 9"],
            },
            minifier: true//圧縮を有効
        }))
        .pipe(gulp.dest(WEBROOT + "/css"))
        .pipe(browserSync.reload({stream:true}));
});

//Just reload
gulp.task("reload", function() { browserSync.reload() });

//browser sync
gulp.task("browsersync", function() {
 browserSync.init({
    files: ['yuinyan/views/**/*.*'],
    proxy: 'http://localhost:3000/',
    port: 8080,
    open: false
  });
});

gulp.task('default', ['browsersync','style'],function(){
    gulp.watch(WEBROOT + "/sass/**/*.scss",["style"]);
    gulp.watch(WEBROOT + "/images/**/*",["reload"]);
});
