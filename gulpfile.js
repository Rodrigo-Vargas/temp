"use strict";

const gulp          = require("gulp");
const browserSync   = require("browser-sync");
const cp            = require("child_process");
const plumber       = require("gulp-plumber");
var sourcemaps      = require("gulp-sourcemaps");
const sass          = require("gulp-sass");

const webpack = require("webpack");
const webpackconfigDev = require("./webpack.dev.config.js");
const webpackstream = require("webpack-stream");

var messages = {
   jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
}

function jekyllInit(done) {
   return cp.spawn("bundle", 
                     ["exec", "jekyll build"], 
                     { stdio: "inherit" }
            )
            .on("close", done);
}

function jekyllBuild (done) {
   console.log("Running jekyll rebuild");

   browserSync.notify(messages.jekyllBuild);
   return cp.spawn("bundle", ["exec", "jekyll build"], { stdio: "inherit" })
      .on("close", done);
}

function jekyllRebuild (done) {
   jekyllBuild(function(){
      browserSync.reload();
      done();
   })   
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

  return (
    gulp
    .src("src/js/index.js")
    .pipe(plumber())
    .pipe(webpackstream(webpackconfigDev, webpack))
    .pipe(gulp.dest("./"))
  );
}

function compileScss (done) {
   console.log("Running sass task");
   
   var sassDevOptions = {
      outputStyle: "expanded"
   }

   /* Compile inline styles and put on includes*/
   gulp.src(["./src/sass/inline-*.scss"])
      .pipe(sass(sassDevOptions).on("error", sass.logError))
      .pipe(gulp.dest("_includes/"));

   gulp.src(["./src/sass/*.scss", "!src/sass/inline-*.scss"])
               .pipe(plumber())
               .pipe(sourcemaps.init())
               .pipe(sass(sassDevOptions)
               .on("error", sass.logError))
               .pipe(gulp.dest("assets/css/"))
               .pipe(gulp.dest("_site/assets/css/")) // Force overwrite on build site folder
               .pipe(sourcemaps.write('_site/assets/css/')); 

   browserSync.reload();
   done();
}

function watch () {
   gulp.watch("src/sass/**/*.scss", gulp.series(compileScss));
   gulp.watch("src/js/**/*.js", gulp.series(js, jekyllRebuild));
   gulp.watch(
               [
                  "**/*.md",
                  "*.html", 
                  "blog/*",
                  "_includes/*/**.html",
                  "_layouts/*.html",
                  "!_site/*/**"
               ],
               jekyllRebuild
            );
}

const init = gulp.parallel(watch, js, compileScss, browserSyncInit);

exports.default = init;