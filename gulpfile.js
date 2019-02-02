var gulp          =  require("gulp");
var browserSync   = require("browser-sync");
var cp            = require("child_process");
var concat        = require("gulp-concat");
var minify        = require('gulp-minify');
var cleanCss      = require('gulp-clean-css');
var sass          = require("gulp-sass");


var messages = {
   jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task("jekyll-build", function (done) {
   browserSync.notify(messages.jekyllBuild);
   return cp.spawn("bundle", ["exec", "jekyll build"], { stdio: "inherit" })
      .on("close", done);
});

gulp.task("jekyll-rebuild", ["jekyll-build"], function () {
   browserSync.reload();
});


gulp.task("browser-sync", ["jekyll-build"], function () {
   browserSync({
      server: {
         baseDir: "_site"
      }
   });
});

gulp.task("js", function () {
   gulp.src(["src/js/site.js"])
      .pipe(concat("site.js"))
      .pipe(minify())
      .pipe(gulp.dest("assets/js/"));


   return gulp.src(["src/js/vendor/jquery.js", "src/js/vendor/inputmask.dev.js", "src/js/vendor/inputmask.js", "src/js/contact.js"])
      .pipe(concat("contact.js"))
      .pipe(minify())
      .pipe(gulp.dest("assets/js/"));
});

gulp.task("sass", function () {
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
});

gulp.task("watch", function () {
   gulp.watch("src/sass/**/*.scss", ["sass", "jekyll-rebuild"]);
   gulp.watch("src/js/**/*.js", ["js", "jekyll-rebuild"]);
   gulp.watch(
                  [
                     "**/*.md",
                     "index.html", 
                     "_includes/*/**.html", 
                     "_layouts/*.html", 
                     //"_posts/*",
                     "!_site/*/**}"
                  ],
                  ["jekyll-rebuild"]
            );
});

gulp.task("default", ["js", "sass", "browser-sync", "watch"]);
