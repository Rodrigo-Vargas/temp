---
   layout: base
   permalink: /resume/
   published: false
---

<div class="web-resume">
   <div class="container">
      <h1>{{ site.author_name }}</h1>
      <h3>{{ site.author_job }}</h3>
      <div class="about">
         Software developer since 2012.
      </div>

      <div class="row">
         
         <div class="col-xs-4">
            <div id="personal-info" class="section">
               <div class="title">
                  <span class="fa-stack fa-lg">
                     <i class="fa fa-circle fa-stack-2x"></i>
                     <i class="fa fa-user fa-stack-1x fa-inverse"></i>
                  </span>
                  <h2>Personal Info</h2>
               </div>               

               <div class="info">
                  <label>Phone</label>
                  <span>+55 51 997838846</span>
               </div>

               <div class="info">
                  <label>E-mail</label>
                  <span>rodrigo@rodrigovargas.me</span>
               </div>

               <div class="info">
                  <label>Personal site</label>
                  <span>http://rodrigovargas.me</span>
               </div>

               <div class="info">
                  <label>Linkedin</label>
                  <span>linkedin.com/in/rodrigo-vargas-894a3637/</span>
               </div>
            </div>

            <div id="languages" class="section">
               <div class="title">
                  <span class="fa-stack fa-lg">
                     <i class="fa fa-circle fa-stack-2x"></i>
                     <i class="fa fa-flag fa-stack-1x fa-inverse"></i>
                  </span>
                  <h2>Languages</h2>
               </div>

               <div class="info">
                  <label>Brazilian Portuguese</label>
                  <span>
                     <i class="fa fa-star"></i>
                     <i class="fa fa-star"></i>
                     <i class="fa fa-star"></i>
                     <i class="fa fa-star"></i>
                     <i class="fa fa-star"></i>
                  </span>
               </div>

               <div class="info">
                  <label>English</label>
                  <span>
                     <i class="fa fa-star"></i>
                     <i class="fa fa-star"></i>
                     <i class="fa fa-star"></i>
                  </span>
               </div>
            </div>

            <div id="technical-skills" class="section">
               <div class="title">
                  <span class="fa-stack fa-lg">
                     <i class="fa fa-circle fa-stack-2x"></i>
                     <i class="fa fa-desktop fa-stack-1x fa-inverse"></i>
                  </span>
                  <h2>Technical skills</h2>
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
                        </span>
                     </div>
                  {% endfor %}
               {% endfor %}
            </div>

         </div>

         <div class="col-xs-8">
            <div id="experience" class="section">
               <div class="title">
                  <span class="fa-stack fa-lg">
                     <i class="fa fa-circle fa-stack-2x"></i>
                     <i class="fa fa-briefcase fa-stack-1x fa-inverse"></i>
                  </span>
                  <h2>Experience</h2>
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


            <div id="education" class="section">
               <div class="title">
                  <span class="fa-stack fa-lg">
                     <i class="fa fa-circle fa-stack-2x"></i>
                     <i class="fa fa-graduation-cap fa-stack-1x fa-inverse"></i>
                  </span>
                  <h2>Education</h2>
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


            <div id="projects" class="section">
               <div class="title">
                  <span class="fa-stack fa-lg">
                     <i class="fa fa-circle fa-stack-2x"></i>
                     <i class="fa fa-lightbulb-o fa-stack-1x fa-inverse"></i>
                  </span>
                  <h2>Projects</h2>
               </div>
               {% assign projects = site.projects | sort: 'date' | reverse %}
               {% for project in projects %}
                  <div class="item">
                     <div class="date">
                        <span>{{ project.period }}</span>
                     </div>
                     <div class="description">{{ project.name }}</div>
                  </div>
               {% endfor %}
            </div>
         </div>


      </div>

      <!--<img src="/assets/img/resume-example.png" alt="resume">-->
   </div>
</div>