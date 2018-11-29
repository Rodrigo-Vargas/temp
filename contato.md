--- 
   layout: default
   permalink: /contact/
---

<div id="content">
   <section id="contact" class="contact ">
      <div class="inner">
         <div class="container">
            <div class="title">
               <h2 class="section-title">Contact</h2>
               <span class="section-excerpt">
                  Say hello!
               </span>
            </div>
            
            <div class="row">
               <div class="col-12">
                  <div class="box-with-shadow">
                     <form action="https://formspree.io/rodrigo@rodrigovargas.me" method="POST">
                        <div class="form-group">
                           <input required type="text" class="form-control" name="name" placeholder="Name">
                        </div>
                     
                        <div class="form-group">
                           <input   required type="text" 
                                    class="form-control" name="email" 
                                    placeholder="Email" 
                                    data-inputmask="'alias': 'email', 'clearIncomplete': true">
                        </div>
                     
                        <div class="form-group">
                           <textarea required type="text" class="form-control" name="body" rows="6" placeholder="Message"></textarea>
                        </div>
                     
                        <div class="form-group">
                           <button type="submit" href="#" class="btn btn-primary">Send</button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
</div>