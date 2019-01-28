---
   layout: default
   published: false
---

   <section id="resume" class="resume">
      <div class="inner">
         <div class="container">
            <div class="title">
               <h2 class="section-title">Resumé</h2>               
            </div>
            
            <div class="content">
               <div class="career experience">
                  <h2 class="section-subtitle">Experience</h2>
                  <div class="jobs timeline" data-timeline="true">
                     {% for job in site.career %} 
                        {% include home/experience-item.html job=job %} 
                     {% endfor %}
                     <div class="baseline"></div>
                  </div>                  
               </div>

               <div class="career education">
                  <h2 class="section-subtitle">Education</h2>
                  <div class="jobs timeline" data-timeline="true">
                     {% assign courses = site.education | sort: 'year' | reverse %} 
                     {% for course in courses %} 
                        {% include home/education-item.html course=course %} 
                     {% endfor %}
                     <div class="baseline"></div>
                  </div>
               </div>

            
               <div class="row">
                  <div class="col-sm-12">
                     <div class="skills">
                        <h2 class="section-subtitle">Skills</h2>
                        <div class="list">
                           <div class="row">
                              {% assign grouped_skills = site.skills | sort: 'stars' | reverse | group_by: 'stars' %} {% for grouped_skill in grouped_skills
                              %} {% assign skills = grouped_skill.items | sort: 'name' %} {% for skill in skills %}
                              <div class="col-sm-offset-3 col-sm-6">
                                 <div class="skill row">
                                    <span class="name col">
                                       {{ skill.display_name }}
                                    </span>
            
                                    <div class="stars col">
                                       {% for i in (1..skill.stars) %}
                                       <i class="fa fa-star"></i>
                                       {% endfor %}
                                    </div>
                                 </div>
                              </div>
                              {% endfor %} {% endfor %}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            
               <div class="download-buttons">
                  <a class="btn default" href="/resume">Web version resume</a>
            
                  <a class="btn default" href="/assets/resume.pdf">Download in pdf format</a>
               </div>
            </div>
         </div>
      </div>
   </section>