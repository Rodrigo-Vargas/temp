---
  layout: page
---

<div class="container">
  <div class="internal">
    <h2 class="internal-title">Courses</h2>

    <div class="row">
      <% WOR::Collection.new('Courses').items.each do | course | %>
        <div class="col-md-4">
          <div class="course">
            <a href="<%= course.url %>"><%= course.title %></a>
          </div>
        </div>
      <% end %>
    </div>
  </div>
</div>