var env           = require("minimist")(process.argv.slice(2));
var gulp          =  require("gulp");
var plumber       = require("gulp-plumber");
var browserSync   = require("browser-sync");
var cp            = require("child_process");
var concat        = require("gulp-concat");
var uglify        = require("gulp-uglify");
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
   return gulp.src((env.p) ? "src/js/**/*.js" : ["src/js/**/*.js", "!src/js/analytics.js"])
      //.pipe(plumber())
      //.pipe(concat("main.js"))
      //.pipe(uglify())
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
   gulp.watch("src/sass/**/*.scss", ["sass"]);
   gulp.watch("src/js/**/*.js", ["js", "jekyll-rebuild"]);
   gulp.watch(
                  [
                     "**/*.md",
                     "index.html", 
                     "_includes/*.html", 
                     "_layouts/*.html", 
                     //"_posts/*",
                     "!_site/*/**}"
                  ],
                  ["jekyll-rebuild"]
            );
});

gulp.task("default", ["js", "sass", "browser-sync", "watch"]);
