---
   categories: [wordpress]
   date: 2019-06-24
   excerpt: Learn from creating a WordPress theme from scratch, exploring all the concepts behind the most used web framework
   cover_url: "getting-started-wp-theme.png"
   lang: en
   permalink: /en/blog/creating-a-wordpress-theme-from-scratch
   published: true
   title: Creating a WordPress theme from scratch
---

Hi everyone!

Today we will start a series of posts with the main goal of create a WordPress theme that will be submitted to the WordPress repository.

## Planning

In this post, we will explore the basic files that a WordPress theme needs to work, in addition to the next steps that will come.

## Naming the theme

Before we start, let's define the purpose that our theme will have, a target audience. This will not necessarily influence technical learning, but it will give us a way to think about cool user cases where we will can apply the concepts of developing a customized theme for WordPress. I encourage you to create an objective for your theme, so you can apply the concepts that we will explore here in purposes more related to your work.

That said, the first step will be to create a name for the theme. I found this cool site on Google called <a href="https://namelix.com/">namelix.com</a>, which will help me with creating the name for the theme. Just throw some <em> brand words </em> at it and that's it, we have ours of our theme, which will be **uphealth**.

Having chosen the name, we will create a new repository on GitHub for our project.

The repository of this project will be hosted on <a href="https://github.com/Rodrigo-Vargas/wordpress-theme-uphealth">https://github.com/Rodrigo-Vargas/wordpress-theme-uphealth</a>, and will contain all the updates posted in this serie.


## Basic files

here are two files that are strictly necessary for WordPress to recognize the folder as a theme, which are **index.php** and **style.css**. Obviously we cannot make a functional theme with just these two files, but for concept purposes, WordPress already understands a folder that contains these two files as a valid theme.

Next, we'll create a folder with the name of our theme (in my case it's will be "uphealth"), inside the **/wp-content/ themes** directory in our development WordPress installation.

Inside this folder, create the two files that we talked about, index.php and style.css. After creating those files, we will access the WordPress dashboard in the themes section (/wp-admin/themes.php) to activate our theme. The same should be like this on your page:

<img src="/cdn/images/getting-started-wp-theme-preview.png" alt="" />

On the left we have the active theme, in my case it is "Twenty Nineteen", and on the left our theme. If we click on "Theme Details", we will go to a screen where more information about the theme is presented. This information is read from a special header that we can put in the **style.css** file. So let's add the code below in the style.css file.

```css
   Theme Name: UpHealth
   Theme URI: 
   Author: Rodrigo Vargas
   Author URI: rodrigovargas.com.br
   Description: A theme for hospital and doctor clinical proposes
   Requires at least: WordPress 5.2.2
   Version: 0.0.1
   License: 
   License URI: 
   Text Domain: uphealth
   Tags:
```

If we refresh the page, we'll see some of the information that we put above, available on the theme details page.

<img src = "/cdn/images/getting-started-wp-theme-details.png" alt = "" />

After that, click on "Activate" and then look at how our website is doing. As we haven't written anything on it yet, we will only see a blank page. Let's add a "Hello World" to it. Open the index.php file, and paste the code snippet below:

```html
   <html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>UpHealth!</title>
   </head>
   <body>
      <h1>Hello World!</h1>
   </body>
   </html>
```

These steps are the minimal required to create a page running within WordPress. Let's see now how we can do to display the content of the pages and posts in our theme.

## The loop - Showing posts in our theme

The main objective of a WordPress theme will always be to display the posts and pages created by the user. For this, we need to add some WordPress functions to our index.php file, replacing the entire body tag with the content below:

```php
   <h1>Posts</h1>
   <?php while(have_posts()) : ?>
      <?php the_post(); ?>

      <h1><?php the_title(); ?></h1>
      <p><?php the_content(); ?></p>

      <hr>

   <?php endwhile; ?>  
</body>
```

If we refresh our browser, we'll now see all posts published on our WordPress site, sorted from the most recent to the oldest.

And that was it for today folks, in the next post we will continue to improve our theme. See you there!