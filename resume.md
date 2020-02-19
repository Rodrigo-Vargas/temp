---
   layout: base
   permalink: /resume/
---

<link rel="stylesheet" href="/assets/css/resume.css">

<div class="web-resume">
   <div class="container">
      <div class="row">
         <div class="col">
            <h1>{{ site.author_name }}</h1>
            <h3>{{ site.author_job }}</h3>
            <div class="about">
               Software developer desde 2012.
            </div>         
         </div>

         <div class="col">
            <div id="personal-info" class="section">
               <div class="info">
                  <i class="fa fa-phone"></i>
                  <span>+55 51 997838846</span>
               </div>

               <div class="info">
                  <i class="fa fa-envelope"></i>
                  <span>rodrigovargas123@gmail.com</span>
               </div>

               <div class="info">
                  <i class="fa fa-link"></i>
                  <span>http://rodrigovargas.com.br</span>
               </div>

               <div class="info">
                  <i class="fab fa-linkedin"></i>
                  <span>linkedin.com/in/rodrigo-vargas-894a3637/</span>
               </div>
            </div>
         </div>
      </div>
      
      <div id="experience" class="section">
         <div class="title">
            <span class="fa-stack fa-lg">
               <i class="fa fa-circle fa-stack-2x"></i>
               <i class="fa fa-briefcase fa-stack-1x fa-inverse"></i>
            </span>
            <h2>Experiência</h2>
         </div>

         {% for job in site.career %}
            <div class="item">
               <div class="date">
                  <span>{{ job.period }}</span>
               </div>
            
               <div class="description">
                  <h3 class="job-title">{{ job.position }}</h3>
                  <span>{{ job.name }} / {{ job.location }}</span>
                  <div class="job-body">
                     <ul>
                        {% for highlight in job.highlights %}
                           <li>{{ highlight }}</li>
                        {% endfor %}
                     </ul>
                  </div>
               </div>
            </div>
         {% endfor %}
      </div>

      <div class="row">
         
         <div class="col meta">
            <div id="languages" class="section">
               <div class="title">
                  <span class="fa-stack fa-lg">
                     <i class="fa fa-circle fa-stack-2x"></i>
                     <i class="fa fa-flag fa-stack-1x fa-inverse"></i>
                  </span>
                  <h2>Idiomas</h2>
               </div>

               <div class="info">
                  <label>Português</label>
                  <span>
                     <i class="fa fa-star"></i>
                     <i class="fa fa-star"></i>
                     <i class="fa fa-star"></i>
                     <i class="fa fa-star"></i>
                     <i class="fa fa-star"></i>
                  </span>
                  <span>(Nativo)</span>
               </div>

               <div class="info">
                  <label>Inglês</label>
                  <span>
                     <i class="fa fa-star"></i>
                     <i class="fa fa-star"></i>
                     <i class="fa fa-star"></i>
                  </span>
                  <span>(Proficiente em leitura, fala básica)</span>
               </div>
            </div>
         </div>

         <div class="col resume">
            <div id="education" class="section">
               <div class="title">
                  <span class="fa-stack fa-lg">
                     <i class="fa fa-circle fa-stack-2x"></i>
                     <i class="fa fa-graduation-cap fa-stack-1x fa-inverse"></i>
                  </span>
                  <h2>Educação</h2>
               </div>

               {% assign courses = site.education | sort: 'year' | reverse %}
               {% for course in courses %} 
                  <div class="item">
                     <div class="date">
                        <span>{{ course.period }}</span>
                     </div>
                     <div class="description">
                        {{ course.name }}
                     </div>
                  </div>
               {% endfor %}
            </div>
         </div>
      </div>

      <div class="row">         
         <div class="col meta">
            <div id="technical-skills" class="section">
               <div class="title">
                  <span class="fa-stack fa-lg">
                     <i class="fa fa-circle fa-stack-2x"></i>
                     <i class="fa fa-desktop fa-stack-1x fa-inverse"></i>
                  </span>
                  <h2>Habilidades</h2>
               </div>
   
               {% assign grouped_skills = site.skills | sort: 'stars' | reverse | group_by: 'stars' %}
               {% for grouped_skill in grouped_skills %}
               {% assign skills = grouped_skill.items | sort: 'name' %}
                  {% for skill in skills %}
                     <div class="info">
                        <label>{{ skill.display_name }}</label>
                        <span>
                           {% for i in (1..skill.stars) %}
                              <i class="fa fa-star"></i>
                           {% endfor %}
                           ({{ skill.star_title }})
                        </span>
                     </div>
                  {% endfor %}
               {% endfor %}
            </div>
         </div>

         <div class="col resume">
            <div id="projects" class="section">
               <div class="title">
                  <span class="fa-stack fa-lg">
                     <i class="fa fa-circle fa-stack-2x"></i>
                     <i class="fa fa-lightbulb fa-stack-1x fa-inverse"></i>
                  </span>
                  <h2>Projetos Independentes</h2>
               </div>
               {% assign projects = site.projects | sort: 'date' | reverse %}
               {% for project in projects %}
                  <div class="item">
                     <div class="date">
                        <span>{{ project.period }}</span>
                     </div>
                     <div class="description">
                        {{ project.title }}
                        <div>
                           <span class="small">{{ project.link }}</span>
                        </div>
                     </div>
                  </div>
               {% endfor %}
            </div>
         </div>
         
      </div>

      <!--<img src="/assets/img/resume-example.png" alt="resume">-->
   </div>
</div>