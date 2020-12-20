---
   categories: 
      - net-core
      - mvc
   cover_url: en/basic-tasks-and-routing.png
   date: 2019-01-21
   excerpt: First steps into the basic concepts of a .NET Core application
   lang: en
   permalink: /en/blog/routing-and-basic-tasks-dot-net-core-application
   title: Routing and basic concepts in a .NET Core Application
---

[web-app-started]: /cdn/images/basic-tasks-net-mvc-application/web-app-started.png "Webapp Started"

First of all, after create our solution called "my.blog", we'll create the MVC project that contains the basic structure of application. 

Primeiramente, após criar a nossa solution my.blog, vamos criar o projeto web MVC que conterá a estrutura da nossa aplicação. To do this, open the terminal and type the command:

```shell
   dotnet new mvc -o my.blog.web
```

This command will create an MVC project with just the basics

Before finalizing this part, we'll add the new project to our solution, maintaining compatibility with other developers who are going to open this project with Visual Studio:

```shell
   dotnet sln my.blog.sln add my.blog.web/my.blog.web.csproj
```

Made this, now let's go to the **my.blog.web** folder and see the generated file structure.

```shell
   rodrigo@laptop:~/Workspace/my.blog/my.blog.web$ ls
   appsettings.Development.json
   appsettings.json
   Controllers
   Models
   my.blog.web.csproj
   obj
   Program.cs
   Properties
   Startup.cs
   Views
   wwwroot
```

This is absolutelly minimum structure required for an .NET MVC project works. Let's see now how to execute our project and see it running in browser. Use the command *dotnet* and see the output generated:

```shell
   rodrigo@laptop:~/Workspace/my.blog/my.blog.web$ dotnet -h
   .NET Command Line Tools (2.2.102)
   Usage: dotnet [runtime-options] [path-to-application] [arguments]

   Execute a .NET Core application.

   runtime-options:
   --additionalprobingpath <path>     Path containing probing policy and assemblies to probe for.
   --additional-deps <path>           Path to additional deps.json file.
   --fx-version <version>             Version of the installed Shared Framework to use to run the application.
   --roll-forward-on-no-candidate-fx  Roll forward on no candidate shared framework is enabled.

   path-to-application:
   The path to an application .dll file to execute.

   Usage: dotnet [sdk-options] [command] [command-options] [arguments]

   Execute a .NET Core SDK command.

   sdk-options:
   -d|--diagnostics  Enable diagnostic output.
   -h|--help         Show command line help.
   --info            Display .NET Core information.
   --list-runtimes   Display the installed runtimes.
   --list-sdks       Display the installed SDKs.
   --version         Display .NET Core SDK version in use.

   SDK commands:
   add               Add a package or reference to a .NET project.
   build             Build a .NET project.
   build-server      Interact with servers started by a build.
   clean             Clean build outputs of a .NET project.
   help              Show command line help.
   list              List project references of a .NET project.
   migrate           Migrate a project.json project to an MSBuild project.
   msbuild           Run Microsoft Build Engine (MSBuild) commands.
   new               Create a new .NET project or file.
   nuget             Provides additional NuGet commands.
   pack              Create a NuGet package.
   publish           Publish a .NET project for deployment.
   remove            Remove a package or reference from a .NET project.
   restore           Restore dependencies specified in a .NET project.
   run               Build and run a .NET project output.
   sln               Modify Visual Studio solution files.
   store             Store the specified assemblies in the runtime package store.
   test              Run unit tests using the test runner specified in a .NET project.
   tool              Install or manage tools that extend the .NET experience.
   vstest            Run Microsoft Test Engine (VSTest) commands.

   Additional commands from bundled tools:
   dev-certs         Create and manage development certificates.
   ef                Entity Framework Core command-line tools.
   sql-cache         SQL Server cache command-line tools.
   user-secrets      Manage development user secrets.
   watch             Start a file watcher that runs a command when files change.

   Run 'dotnet [command] --help' for more information on a command.
```

In the beginning, they may seem like a lot of commands, but we'll soon be familiar with several of them. What we are looking for now is the **dotnet run**. Run the same and see the page in the browser. If a warning appears that your connection is not secure, you can ignore it.

![A boilerplate webapp running][web-app-started]

After that, we already have our application running. Now let's see how we can edit the generated content.

## Routes, controllers e views

For a MVC application work, it needs to know where to look for the information that the user given URL is accessing. To  this task, every MVC framework has a logic for the creation of **routes**. The route will tell which **controller** and which **view** will be used to load a given page. In the case of .Net, we have this logic described in the file **startup.cs**:

```c#
   app.UseMvc(routes =>
   {
      routes.MapRoute(
         name: "default",
         template: "{controller=Home}/{action=Index}/{id?}");
   });
```

By default the controller name always will be the first part of the URL, followed by the view name. For example, if you access a URL "/users/show/2", the controller will be "users" and try to get the file "UsersController" inside the controller folder. "show" will be the name of the method in this controller(also called **action**), which will call a view whose name is show.cshtml and will be inside the "Views/Users" folder. Can you understood the logic? The last parameter will be passed to the show method as a string or integer parameter.

Another important item to explian is in the case a URL does not have all the components, the standards defined in the model will be used to define the controller, action and view. If, for example, go to "/ users", the display name will be "Index", as the value will be defined in "/ {action = Index}". If you still access "/", the default controller will be "Home" and the default display will be "Index".

At most of times, this convention is enough to our day-to-day development. But what about when you don't want to or can't follow that convention? For example, we will access the "Privacy" page created in the project scaffold. Notice the URL, it is "/Home/Privacy". It's not friendly enough, don't you think? We could improve to it be just "/Privacy". For this, we must define a **custom route**


To accomplish this, add the following piece of code:

```c#
   app.UseMvc(routes =>
   {
      routes.MapRoute(
         name: "default",
         template: "{controller=Home}/{action=Index}/{id?}");

      routes.MapRoute(
         name: "privacy",
         defaults: new {controller="Home", action="Privacy"},
         template: "/privacy"                    
      );
   });
```

To view the changes, you must interrupt the terminal process executing the previous "dotnet run" command and run it again. This is necessary because any changes that are made into ".cs" files, will result the need to create a new DLL, and therefore we need to run the command again to recompile the DLL.

One tip is to run the command **dotnet watch run**, this command will be "listening" for changes in the files, and when there is one, it will be in charge of reloading the application automatically.

Returning to the routes configuration, the address of the Privacy page is now accessed through the URL "/privacy". Okay, now let's see how we do it to edit the content of the pages.

## Finding and editing views

Now let's go back to the home page, and edit the text "Welcome". As we already know, the controller related to this page is called *Home*, and the view is called *Index*. So, in the Views folder, look for this file:


```html
   @{
      ViewData["Title"] = "Home Page";
   }

   <div class="text-center">
      <h1 class="display-4">Welcome</h1>
      <p>Learn about <a href="https://docs.microsoft.com/aspnet/core">building Web apps with ASP.NET Core</a>.</p>
   </div>
```

When editing the text inside the h1, it is reflected on the page automatically.

That's it for today guys. In the next post, we'll see what else we can do with .Net MVC views. See you there!