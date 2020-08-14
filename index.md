---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: home
name: home
css_files: []
js_files: [scroll-polyfill, index]
---

<nav>
  <span class="menu" onclick="jumpTo('about')">About</span>
  <span class="menu" onclick="jumpTo('social')">Social</span>
  <span class="menu" onclick="jumpTo('skills')">Skills</span>
  <span class="menu" onclick="jumpTo('resume')">Resume</span>
  <span class="menu" onclick="jumpTo('blog')">Blog</span>
</nav>

<main>
  {% include about.html %}
  {% include social.html %}
  {% include skills-stack.html %}
  {% include resume.html %}
  <section class="blog anchor-offset" id="blog">
    <div class="sub-title">Blog</div>
    {% include blog_posts.html %}
  </section>
</main>
