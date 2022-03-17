---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: home
name: home
css_files: []
js_files: [scroll-polyfill, index]
---

<div class="nav-wrapper">
  <nav>
    <span class="menu" onclick="jumpTo('about')">About</span>
    <span class="menu" onclick="jumpTo('skills')">Skills</span>
    <span class="menu" onclick="jumpTo('social')">Social</span>
    <a class="menu" href="https://www.linkedin.com/in/guy-yogev-22220096/" target="_blank">Resume</a>
    <a class="menu" href="https://medium.com/@guyogev" target="_blank">Blog</a>
  </nav>
</div>

<main>
  {% include about.html %}
  {% include skills-stack.html %}
  {% include social.html %}
</main>
