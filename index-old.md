---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: default
name: home
css_files: [global, home, icons]
js_files: [home]
---
<div class="bg-img"></div>
<div class="home-wrapper">
  <main class="home">
    <section class="screen-wrapper">
      {% include pc_screen.html %}
    </section>

    <div class="bottom-page-wrapper">
      {% include my_stack.html %}
      {% include blog_posts.html %}
    </div>
  </main>
</div>

<div style="display: none">Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener" >CC 3.0 BY</a></div>

{% include homepage_structured_data.html %}