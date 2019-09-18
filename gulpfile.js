"use strict";

var gulp          = require("gulp");
var browserSync   = require("browser-sync");
var cp            = require("child_process");
var concat        = require("gulp-concat");
var minify        = require('gulp-minify');
var cleanCss      = require('gulp-clean-css');
var sass          = require("gulp-sass");

var messages = {
   jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
}

function jekyllBuild (done) {
   console.log("Running jekyll rebuild");

   browserSync.notify(messages.jekyllBuild);
   return cp.spawn("bundle", ["exec", "jekyll build"], { stdio: "inherit" })
      .on("close", done);
}

function browserSyncInit() {
   browserSync({
      server: {
         baseDir: "_site",
         watch: true,
         serveStaticOptions: {
            extensions: ["html"]
         }
      }
   });
}

function js() {
   console.log("Running JS task");

   gulp.src([
               "src/js/vendor/rv.carousel.js", 
               "src/js/site.js"
            ])
      .pipe(concat("site.js"))
      .pipe(minify())
      .pipe(gulp.dest("assets/js/"));


   return gulp.src([
                     "src/js/vendor/jquery.js", 
                     "src/js/vendor/inputmask.dev.js", 
                     "src/js/vendor/inputmask.js", 
                     "src/js/contact.js"])
      .pipe(concat("contact.js"))
      .pipe(minify())
      .pipe(gulp.dest("assets/js/"));
}

function sass () {
   console.log("Running sass task");
   
   var sassDevOptions = {
      outputStyle: "expanded"
   }

   /* Compile inline styles and put on includes*/
   gulp.src(["./src/sass/inline-*.scss"])
      .pipe(sass(sassDevOptions).on("error", sass.logError))
      .pipe(gulp.dest("_includes/"));

   return gulp.src(["./src/sass/*.scss", "!src/sass/inline-*.scss"])
      .pipe(sass(sassDevOptions).on("error", sass.logError))
      .pipe(gulp.dest("assets/css/"));
}

function watch () {
   gulp.watch("src/sass/**/*.scss", gulp.series(sass, jekyllBuild));
   gulp.watch("src/js/**/*.js", gulp.series(js, jekyllBuild));
   gulp.watch(
               [
                  "**/*.md",
                  "*.html", 
                  "_includes/*/**.html",
                  "_layouts/*.html",
                  "!_site/*/**"
               ],
               jekyllBuild
            );
}

const init = gulp.parallel(watch, js, sass, browserSyncInit);

exports.default = init;