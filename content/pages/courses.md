---
  layout: page
  permalink: /courses
  permalink_pt: /cursos
---

<h2>Cursos</h2>
<% Collection.find_by_name('Courses').items.each do | course | %>
  <a href="/<%= I18n.locale %><%= course.get_permalink('pt') %>">
    <span><%= course.name %></span>
  </a>
<% end %>