---
   breadcrumb:
      -
         text: "Blog"
         link: "/blog"
      -
         text: "Migration in .Net Core MVC application"
         link: "/blog/migration-in-dot-net-application"
   categories: 
      - entity-framework
      - net-core
   date: 2019-02-11
   description: Using Entity Framework, we gonna work a database on a .Net Core MVC application
   lang: en
   layout: article
   title: Migrations in .Net Core MVC application
---

Hi everyone, on today's post, I will advance with the creation of a .Net Core blog, configuring the database layer of the project, that can be connected to a local My SQL Server database. To accomplish this, the first step will be to get to know about the Entity Framework.

## Instaling Entity Framework

The Entity Framework, or just **EF**, is the most famous ORM in the C# community to abstracting operation with databases. Using it, we have higher productivity in tasks that involve operations with database, because we developers don't have to build queries directly in the bank, in addition to providing us with some very interesting features, such as migrations, which we will cover along this post.

Without further conversation, let's get to work. In a terminal, execute the commands below to install the DLLs related to EF in our project:

```bash
    dotnet add package Microsoft.EntityFrameworkCore.Design
    dotnet add package Pomelo.EntityFrameworkCore.MySql
```

Note that in this case, we are configuring EF to connect with a MySQL database, but you will found providers for many other databases. A very nice list is available from the [Framework documentation](https://docs.microsoft.com/pt-br/ef/core/providers/index){: target = "_blank"}.

Once the EF dependencies are installed, we can start configuring the Database Context.

## Creating the Database Context

In order for EF to be able to map all tables in our database into *models*, we must create a **Database Context** file. Create a *Data* folder at the root of project, and inside it, add a file called *BlogDbContext.cs* with the following content:

```c#
   using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
   using Microsoft.EntityFrameworkCore;

   namespace my.blog.web.Data
   {
      public class BlogDbContext : IdentityDbContext
      {
         public BlogDbContext(DbContextOptions<BlogDbContext> options) : base(options)
         { }
      }
   }
```

At this point,  we do not have a defined Model yet, but don't worry, at this moment we are still performing the initial configuration, we will add the models after that.

So, after creating the **Context** file, we must create a connection string with the database information. For that, we will add the following code at the bottom to the file *appsettings.json*.

```json
  "ConnectionStrings": {
    "BlogDBConnection": "Server=127.0.0.1;Database=TutorialBlog;Uid=root;Pwd=root;"
  },
```

The important part here is the parameter **BlogDBConnection**, that will be the name we will use in the last step of Context configuration.

After that, open the file *Startup.cs* in the root of the project, and add the code snippet below inside the *ConfigureServices* method.

```c#
   services.AddDbContext<BlogDbContext>(options =>
      options.UseMySql(
         Configuration.GetConnectionString("BlogDatabase")
      )
   );
```

The parameter assigned to the *GetConnectionString* method is the same one defined as the name of the ConnectionString in the configuration file. With everything configured, we can test the connection to the database, creating our initial project migration.

## Working with Migrations

Migrations are a fantastic feature that has been implemented by some Web Frameworks lately. Think of it as a version control to your database. In a migration we have instructions for adding changes to a database, as well as undoing them, in case we have made a mistake or for any other reason.

In EF, we will define a migration with the following command, where the last parameter is the name of the migration, in our blog it will be **InitialCreate**,

```bash
   dotnet ef migrations add InitialCreate
```

If you encounter a permission error, run the command with elevated privileges. After execute this command, you will notice that a folder called "Migrations" was created at the root of project. Inside it, there are some files as well the migration that we created, which has at the end of the name *_InitialCreate.cs*. Take a few minutes to analyze the generated content, and you will notice that several tables have been created, with several fields.

In the next posts we will create our own migrations, so don't worry top much to understand everything now.

After this step, we are ready to execute migration to create the defined tables in the database. To do this, run the command:

```bash
    dotnet ef database update
```

After a few information was shown in the command window, our migrations were executed. Let's check the result by looking at the database:

```bash
    mysql> show tables;
    +------------------------+
    | Tables_in_TutorialBlog |
    +------------------------+
    | AspNetRoleClaims       |
    | AspNetRoles            |
    | AspNetUserClaims       |
    | AspNetUserLogins       |
    | AspNetUserRoles        |
    | AspNetUserTokens       |
    | AspNetUsers            |
    | __EFMigrationsHistory  |
    +------------------------+
    8 rows in set (0,00 sec)
```

If we want to return the database to the state it was in before, we must run the command first:

```bash
    dotnet ef migrations list

    info: Microsoft.EntityFrameworkCore.Infrastructure[10403]
      Entity Framework Core 2.2.2-servicing-10034 initialized 'BlogDbContext' 
      using provider 'Pomelo.EntityFrameworkCore.MySql' with options: None

    20190217180015_InitialCreate
```

After execute the command, all migrations applied to the bank will be listed. As we only apply one migration, so just only it is displayed. In case we want to go back to the point where the database was before the migrations, we could execute the command below, where the last parameter will be the name of migration:

```bash
    dotnet ef database update 20190217180015_InitialCreate
```

As we only have one migration, it is not possible to roll it back, because there is no previous restoration point. In this case we can simply delete the database, using the command:

```bash
    dotnet ef database drop
```

In the next post, we will see how we can manipulate data in the database using the Entity Framework. See you there!