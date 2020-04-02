---
   breadcrumb:
        -
            text: "Blog"
            link: "/en/blog"
        -             
            text: "Configuring a .Net Core development environment"
            link: "/en/blog/configuring-dot-net-core-environment"
   categories: [devops, net-core]
   cover_url: en/configuring-dot-net-core-environment.png
   date: 2019-01-14
   description: Learn how to configure a .Net core environment for development
   lang: en
   layout: article
   permalink: /en/blog/configuring-dot-net-core-environment
   title: Configuring a .Net Core development environment
---

Hi everyone, how are you doing? In this post, i will show you how install and configure a .Net Core development environment, and show some ways of doing basic operations with .Net Core code generator.

The first step is to download the .Net Core SDK. At time that i'm writing this post, the last version is 2.2. In linux, we can do this by adding the official Microsoft repositories to the machine's package manager, with the following commands:

```shell
   wget -q https://packages.microsoft.com/config/ubuntu/16.04/packages-microsoft-prod.deb
   sudo dpkg -i packages-microsoft-prod.deb
```

After execute then, we can install .NET SDK:

```shell
   sudo apt-get install apt-transport-https
   sudo apt-get update
   sudo apt-get install dotnet-sdk-2.2
```

Before continue, ceck if everything was installed correctly, restarting the terminal and running the command *dotnet*. The output must be similar to this:

```shell
   $ dotnet

   Usage: dotnet [options]
   Usage: dotnet [path-to-application]

   Options:
   -h|--help         Display help.
   --info            Display .NET Core information.
   --list-sdks       Display the installed SDKs.
   --list-runtimes   Display the installed runtimes.

   path-to-application:
  The path to an application .dll file to execute. 
```

## Configuring dotnet generator

To be able to scaffold common files, we need to run the command below to add the .Net file scaffolding tool:

```shell
   dotnet tool install --global dotnet-aspnet-codegenerator
```

Also, will be necessary add the following packages using nuget:

- Microsoft.VisualStudio.Web.CodeGeneration.Utils
- Microsoft.VisualStudio.Web.CodeGeneration.Design

After that, restore this packages using the following command and everythE após, instale os pacotes adicionados usando:

```shell
   dotnet restore
```

## Adding a controller

```shell
   dotnet aspnet-codegenerator controller -name PostsController
```

## Adding a view

To adding a view, use the command below, where *Index* is the view name, *Empty* is the type and *Views/Posts* is the folder where it will be created.

```shell
   dotnet aspnet-codegenerator View Index Empty  --relativeFolderPath Views/Posts
```

In addition to these, there are other operations that you can perform with the .Net Core code generator, by running the following command, a help section is shown, with other possibilities of commands and arguments:

```shell
   dotnet aspnet-codegenerator -h
```

That was it for today, until next time !!!