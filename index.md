---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: default
name: home
css_files: [global, index]
js_files: [index]
---
<link rel="preload" href="/assets/images/code-bg.jpg" as="image">

<header>
  <span class="menu" onclick="jumpTo('about')">About</span>
  <span class="menu" onclick="jumpTo('skills')">Skills</span>
  <span class="menu" onclick="jumpTo('resume')">Resume</span>
  <span class="menu" onclick="jumpTo('social')">Social</span>
  <span class="menu" onclick="jumpTo('blog')">Blog</span>
</header>

<!-- About -->
<div class="about" id="about">
  <div class="about-bg"></div>
  <div class="title">
    <span class="first-text">Guy Yogev</span>
    <span class="second-text">
      <span class="word word-1">Gets</span>
      <span class="word word-2">things</span>
      <span class="word word-3">done</span><span class="word word-4">.</span>
    </span>
  </div>
</div>

<!-- Skills/Stack -->
<div class="skills anchor-offset" id="skills">
  <div class="sub-title">Skill Set</div>
  <div class="groups">
    <div class="group">
      <div class="skill">
        <div class="skill-name">JavaScript</div>
        <div class="level level-1"></div>
      </div>

      <div class="skill">
        <div class="skill-name">Sass/Css</div>
        <div class="level level-2"></div>
      </div>

      <div class="skill">
        <div class="skill-name">Ruby</div>
        <div class="level level-2"></div>
      </div>

      <div class="skill">
        <div class="skill-name">Elixir</div>
        <div class="level level-2"></div>
      </div>

      <div class="skill">
        <div class="skill-name">SQL</div>
        <div class="level level-5"></div>
      </div>
    </div>

    <div class="group">
      <div class="skill">
        <div class="skill-name">Rails</div>
        <div class="level level-2"></div>
      </div>

      <div class="skill">
        <div class="skill-name">Phoenix</div>
        <div class="level level-2"></div>
      </div>

      <div class="skill">
        <div class="skill-name">NodeJS</div>
        <div class="level level-4"></div>
      </div>
    </div>
  </div>

  <div class="groups">
    <div class="group">
      <div class="skill">
        <div class="skill-name">Angular JS</div>
        <div class="level level-1"></div>
      </div>

      <div class="skill">
        <div class="skill-name">Angular</div>
        <div class="level level-3"></div>
      </div>

      <div class="skill">
        <div class="skill-name">React</div>
        <div class="level level-3"></div>
      </div>

      <div class="skill">
        <div class="skill-name">Jekyll</div>
        <div class="level level-3"></div>
      </div>

      <div class="skill">
        <div class="skill-name">Ionic</div>
        <div class="level level-5"></div>
      </div>
    </div>

    <div class="group">
      <div class="skill">
        <div class="skill-name">Heroku</div>
        <div class="level level-2"></div>
      </div>

      <div class="skill">
        <div class="skill-name">AWS</div>
        <div class="level level-3"></div>
      </div>

      <div class="skill">
        <div class="skill-name">Docker</div>
        <div class="level level-3"></div>
      </div>
    </div>
  </div>
</div>

<!-- Resume -->
<div class="resume" id="resume">
  <div class="sub-title">Resume</div>
  <div class="groups">

    <div class="group">
      <div class="bullet">
        <div class="bullet-title">
          <div class="logo spectory"></div>
          <div>
            <span class="date">2014 - 17: </span>
            <span class="position">Fullstack Web Developer</span>
            <span class="location">@Spectory</span>
          </div>
        </div>
        <p>
          <a href="https://www.spectory.com/" target="blank">Spectory</a>
          provides professional software development solutions to startups and
          organizations worldwide.
        </p>
        <p>
          As a junior, and later on as a senior developer, my role included all
          aspects of software development such as design, development, profiling
          and maintenance.
        </p>
        <p>
          In addition to the regular development tasks, I also led the company
          'On Boarding' program, which is a 4 weeks training for junior web
          developers, jump-starting their carrier.
        </p>
        <p>
          I played major part at the company DevOps, which included designing
          and implementing our very own SpecCI. SpecCI Docker based Continuous
          Integration/Deployment tool, that allows us to tailor suite automation
          project code merges, tests, and finally deploy on green to any
          environment.
        </p>
      </div>
      <div class="bullet">
        <div class="bullet-title">
          <div class="logo google"></div>
          <div>
            <span class="date">2017 - Today: </span>
            <span class="position">Front End Developer</span>
            <span class="location">@Google TLV</span>
            <span>(Vendor by Spectory)</span>
          </div>
        </div>
        <p>
          A vendor team member at Google trends team.
          Develop and maintain the front end of <a href="https://trends.google.com" target="blank">Google Trends</a>,
          Trends events (such as <a href="https://trends.google.com/yis/2017" target="blank">Year In Search</a>),
          and a number of internal tools used by
          <a href="https://newsinitiative.withgoogle.com/" target="blank">Google News Initiative</a>.
        </p>
      </div>
    </div>
    <div class="group">
      <div class="bullet">
        <div class="bullet-title">
          <div class="logo bgu"></div>
          <div>
            <span class="date">2010 - 14: </span>
            <span class="position">B.Sc Computer science & Linguistics</span>
            <span class="location">@Ben Gurion University</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="social anchor-offset" id="social">
  <div class="sub-title">Social</div>
  <div class="links">
    <a href="https://github.com/guyogev" target="blank" class="logo">
      <img src="data:image/png;base64,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"/>
      <div class="label">github</div>
    </a>
    <a href="https://stackoverflow.com/users/6767060/guy-yogev?tab=profile" target="blank" class="logo">
      <img src="data:image/png;base64,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"/>
      <div class="label">S.O.</div>
    </a>
    <a href="https://www.codewars.com/users/guyogev" target="blank" class="logo">
      <img src="data:image/png;base64,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" />
      <div class="label">codewars</div>
    </a>
    <a href="https://www.linkedin.com/in/guy-yogev-22220096/" target="blank" class="logo">
      <img src="https://freeiconshop.com/wp-content/uploads/edd/linkedin-outline.png"/>
      <div class="label">linkedin</div>
    </a>
    <a href="https://app.pluralsight.com/profile/guy-yogev" target="blank" class="logo">
      <img src="data:image/png;base64,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" />
      <div class="label">pluralsight</div>
    </a>
    <a href="https://twitter.com/guyogev" target="blank" class="logo">
      <img src="data:image/png;base64,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" />
      <div class="label">twitter</div>
    </a>
  </div>
</div>

<!-- Blog -->
<div class="blog anchor-offset" id="blog">
  <div class="sub-title">Blog</div>
  {% for post in site.posts %}
    <a href="{{ post.url }}">
      <div class="date">{{ post.date | date_to_string }}</div>
      <div class="post-text">
        <div class="post-title">{{ post.title }}</div>
        <div class="post-subtitle">{{ post.subtitle }}</div>
      </div>
    </a>
  {% endfor %}
</div>
