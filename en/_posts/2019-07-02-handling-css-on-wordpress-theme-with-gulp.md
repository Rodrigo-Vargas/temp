---
   breadcrumb:
    -
      text: "Blog"
      link: "/blog"
    -             
      text: "Handling CSS in a WordPress theme"
      link: "/blog/handling-css-on-wordpress-theme-with-gulp"
   categories: [wordpress]
   cover_url: handling-css-wp-theme.png
   date: 2019-07-02
   description: Learn a useful way to organize the front-end of my WordPress projects
   lang: en
   layout: article
   permalink: /en/blog/handling-css-on-wordpress-theme-with-gulp
   title: Handling CSS in a WordPress theme
---

Hi everyone! On today's post, I will show you a useful way to handle the front-end assets of my WordPress projects.

As start point, I will use Irei use the project that we started to build in the <a href="http://rodrigovargas.com.br/criando-um-tema-wordpress-do-zero/">first post</a> of "How Create a WordPress theme", that you can download in his <a href="https://github.com/Rodrigo-Vargas/wordpress-theme-uphealth">Github repository</a>.

## Linking the style.css in WordPress theme

Before to start how to handle our stylesheets, we must link the style.css file on the **index.php** theme file, that can be made of the folowin way, adding the following line below the **head** section:

```php
   <link rel="stylesheet" href="<?php echo get_stylesheet_uri(); ?>">
```

## What is Gulp?

To automate all tasks involving the front-end of our theme, I will use <a href="https://gulpjs.com/" target="_blank">Gulp</a>, which is a task runner for JavaScript. In short, Gulp makes several tasks much simpler and automated, as it allows us to run customized routines, in addition to being able to install plugins made for Gulp, which perform many useful tasks, such as minifying the code, copying files, transpiling JavaScript ECMA6, among other diverse tasks.

## Initing a node.js package

If you have already made a node.js application, you probably already know the **package.json** file, if you haven't already, in short it is a file that will be the reference of the package we are creating, where we write some information that identify our package and which packages will be necessary for our package to work.

With the node.js tooling installed on machine, execute the following command:

```bash
    npm init
```

After that, a series of questions regarding the package will be asked. Below I show you how I answered in my case:

```bash
   package name: (uphealth)
   version: (1.0.0)
   description: A front-end asset handler to uphealth theme
   entry point: (index.js)
   test command:
   git repository: (https://github.com/Rodrigo-Vargas/wordpress-theme-uphealth.git)
   keywords:
   author: Rodrigo Vargas
   license: (ISC)
   About to write to C:\Workspace\VVV\www\uphealth\public_html\wp-content\themes\uphealth\package.json:

   {
   "name": "uphealth",
   "version": "1.0.0",
   "description": "A front-end asset handler to uphealth theme",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" &amp;&amp; exit 1"
   },
   "repository": {
      "type": "git",
      "url": "git+https://github.com/Rodrigo-Vargas/wordpress-theme-uphealth.git"
   },
   "author": "Rodrigo Vargas",
   "license": "ISC",
   "bugs": {
      "url": "https://github.com/Rodrigo-Vargas/wordpress-theme-uphealth/issues"
   },
   "homepage": "https://github.com/Rodrigo-Vargas/wordpress-theme-uphealth#readme"
   }

   Is this OK? (yes)
```

You will notice that after we finish this step, the package.json file was created in the directory where the command was executed.

## Configuring gulp

The next step will be to install the *gulp* command line utility, with which we will be able to access the "gulp" command and thus perform the tasks. Run the command below on your terminal:

```bash
   npm install gulp -g
```

With the gulp utility installed, we can now create a file called gulpfile.js at the root of our project, this file will contain all the tasks that we would like to automate in our project.

## Precompiling SCSS with Gulp

To take care of our theme's stylesheets, I will use the SASS precompiler, which allows us to better organize our project's stylesheets. But don't worry, after all just CSS files are generated, so the browser can interpret with no problems. We will leave this task to gulp and some of its plugins.

Starting with the **gulpfile.js**, we will create a function that will search for the SCSS files in the "src" folder, and in the end it will overwrite the style.css file that we have at the root of our theme. The file must look like this:

```javascript
   const gulp           = require("gulp");
   const plumber        = require("gulp-plumber");
   const sass           = require("gulp-sass");

   function css() {
      return gulp
      .src("./src/scss/style.scss")
      .pipe(plumber())
      .pipe(sass({ outputStyle: "expanded" }))
      .on("error", sass.logError)
      .pipe(gulp.dest("./"));
   }

   exports.css = css;
```

At the top of our gulpfile, we have two dependencies (gulp and gulp-plumber), which must be installed using the command below:

```bash
   npm install gulp gulp-plumber gulp-sass --save-dev
```

After this configuration, we will create a file called style.scss that should be inside the folder "/ src / scss". Cut the contents of style.css into this new file and execute the command below in the terminal:

```bash
   gulp css
```

An output similar to this will be generated:

```bash
   PS C:\Workspace\VVV\www\uphealth\public_html\wp-content\themes\uphealth> gulp css
   [14:15:10] Using gulpfile C:\Workspace\VVV\www\uphealth\public_html\wp-content\themes\uphealth\gulpfile.js
   [14:15:10] Starting 'css'...
   [14:15:10] Finished 'css' after 34 ms
```

If you look now or in our style.css file, it may reflect the "compiled" result of the style.scss file. Try adding a new class to the style.scss file and see that it will be generated in the style.css file when you run the "gulp css" command.

<blockquote>Tip: Add a file called ".gitignore" to your theme and place the folder "node_modules" inside it, so these files will not pollute your repository.</blockquote>

## Automating SCSS compilation

We have already seen how to compile our SCSS files using the "gulp css" command, but don't it be nice if we could make this happen every time we saved the file? How about update the page automatically after that? With gulp, it becomes very easy. We will add a new task, which will monitor the files and trigger the "css" function automatically. To do this, modify the gulpfile.js file as follows:


```javascript
   const gulp           = require("gulp");
   const plumber        = require("gulp-plumber");
   const sass           = require("gulp-sass");

   function css() {
      return gulp
      .src("./src/scss/style.scss")
      .pipe(plumber())
      .pipe(sass({ outputStyle: "expanded" }))
      .on("error", sass.logError)
      .pipe(gulp.dest("./"));
   }

   function watchFiles() {
      gulp.watch("src/scss/**/*.scss", css);
   } 

   const start = gulp.parallel(css, watchFiles);

   exports.default = start;
```

Note that we have a new function called "watchFiles", which will look for files with the extension ".scss" inside the folder "src/scss". We also changed the part of the final export, defining a function called "default" which is the function that gulp looks inside the file by default. Now, we can just execute the command "gulp" to start monitoring the modification of files.

Still on the line where we define a constant called "start", there is a command that instruct the gulp execute the functions css and watchFiles in a parallel way, performing the compilation of scss in addition to the monitoring routine we talked early, thus, we will not need to save any file so that the gulp already perform a first build of the scss files. Now let's execute the command below to check if everything is correct:

```bash
   gulp
```

Note that at the terminal exit, the process does not end, it is running indefinitely, and after making any changes to the scss file and saving the file, the "css" function is called again. To end the monitoring, press "ctrl + c" on the terminal.

## Browser Sync: refreshing browser page automatically

To finish today's post, we will add the <a href="https://www.browsersync.io/docs/gulp" target="_blank">browser sync</a> plugin so that it refresh the browser page as soon as we save our scss files. To do this, modify the gulpfile.js file as follows:

```javascript
   const browsersync    = require("browser-sync").create();
   const gulp           = require("gulp");
   const plumber        = require("gulp-plumber");
   const sass           = require("gulp-sass");

   function browserSync(done) {
      browsersync.init({
      proxy: "uphealth.test"
      });
      done();
   }

   function css() {
      return gulp
      .src("./src/scss/style.scss")
      .pipe(plumber())
      .pipe(sass({ outputStyle: "expanded" }))
      .on("error", sass.logError)
      .pipe(gulp.dest("./"))
      .pipe(browsersync.stream());
   }

   function watchFiles() {
      gulp.watch("src/scss/**/*.scss", css);
   } 

   const start = gulp.parallel(css, watchFiles, browserSync);

   exports.default = start;
```

Note that we added a new function called "browserSync" that will actually start the browser sync process, and we also added it at the end of the css function, so that it passes the result of the compilation directly to the browser. As I use <a href="https://varyingvagrantvagrants.org/" target="_blank">VVV</a> to develop on WordPress, I used the "proxy" parameter to redirect it to the "uphealth.test" url, which is the URL to which my site is linked. You can check the configuration of the browser sync on its documentation page, and check other options if you develop with localhost or otherwise.

The last modification was in the "default" function, we added browserSync, as a new task.

We will also need to add the new dependency (browser-sync) to our package.json file:

```bash
   npm install browser-sync --save-dev
```

After that, we can check if everything is working correctly by executing the "gulp" command in the terminal. Notice now that when modifying any SCSS file, the changes appear immediately on the page.

And that's all guys, I don't include the javascript part in this post, but I'll show you in the next week's post. See you next time!