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
  <span class="menu" onclick="jumpTo('skills')">Skills</span>
  <span class="menu" onclick="jumpTo('resume')">Resume</span>
  <span class="menu" onclick="jumpTo('social')">Social</span>
  <span class="menu" onclick="jumpTo('blog')">Blog</span>
</nav>

<main>
  <!-- About -->
  <header class="about" id="about">
    <div class="about-bg"></div>
    <div class="title">
      <span class="first-text">Guy Yogev</span>
      <span class="second-text">
        <span class="word word-1">Gets</span>
        <span class="word word-2">things</span>
        <span class="word word-3">done</span><span class="word word-4">.</span>
      </span>
    </div>
  </header>

  <!-- Skills/Stack -->
  <section class="skills anchor-offset" id="skills">
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
  </section>

  <!-- Resume -->
  <section class="resume" id="resume">
    <div class="sub-title">Resume</div>
    <div class="groups">

      <div class="group">
        <!-- Waze -->
        <!--
        <div class="bullet">
          <div class="bullet-title">
            <div class="logo">
              <img data-src="/assets/images/waze.svg"/>
            </div>
            <div>
              <span class="date">2020 - Today: </span>
              <span class="position">Front End Developer</span>
              <span class="location">@Google TLV</span>
              <span>(Vendor by Spectory)</span>
            </div>
          </div>
          <p>
            A vendor team member at Waze.
          </p>
          <p>
            TODO
          </p>
        </div>
        -->

        <!-- Trends -->
        <div class="bullet">
          <div class="bullet-title">
            <div class="logo">
              <img data-src="https://cdn1.iconfinder.com/data/icons/company-identity/100/new-google-favicon-128.png"/>
            </div>
            <div>
              <span class="date">2017 - 2020: </span>
              <span class="position">Front End Developer</span>
              <span class="location">@Google TLV</span>
              <span>(Vendor by Spectory)</span>
            </div>
          </div>
          <p>
            A vendor team member at Google Trends team.
          </p>
          <p>
            Develop and maintain the front end of <a href="https://trends.google.com" target="blank">Google Trends</a>,
            Trends events (such as <a href="https://trends.google.com/yis/2017" target="blank">Year In Search</a>),
            and a number of internal tools used by
            <a href="https://newsinitiative.withgoogle.com/" target="blank">Google News Initiative</a>.
          </p>
        </div>

        <!-- Spectory -->
        <div class="bullet">
          <div class="bullet-title">
            <div class="logo">
              <img data-src="/assets/images/spectory_logo.png"/>
            </div>
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
            developers, jump-starting their career.
          </p>
          <p>
            I played major part at the company DevOps, which included designing
            and implementing our very own SpecCI. SpecCI Docker based Continuous
            Integration/Deployment tool, that allows us to tailor suite automation
            project code merges, tests, and finally deploy on green to any
            environment.
          </p>
        </div>
      </div>
      <div class="group">
        <div class="bullet">
          <div class="bullet-title">
            <div class="logo ">
              <img data-src="/assets/images/bgu-logo.png"/>
            </div>
            <div>
              <span class="date">2010 - 14: </span>
              <span class="position">B.Sc Computer science & Linguistics</span>
              <span class="location">@Ben Gurion University</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="social anchor-offset" id="social">
    <div class="sub-title">Social</div>
    <div class="links">
      <a href="https://github.com/guyogev" target="blank" class="logo">
        <img data-src="/assets/images/github.png"/>
        <div class="label">github</div>
      </a>
      <a href="https://stackoverflow.com/users/6767060/guy-yogev?tab=profile" target="blank" class="logo">
        <img data-src="/assets/images/stackoverflow.png"/>
        <div class="label">S.O.</div>
      </a>
      <a href="https://www.codewars.com/users/guyogev" target="blank" class="logo">
        <img data-src="/assets/images/codewars.png" />
        <div class="label">codewars</div>
      </a>
      <a href="https://www.linkedin.com/in/guy-yogev-22220096/" target="blank" class="logo">
        <img data-src="https://freeiconshop.com/wp-content/uploads/edd/linkedin-outline.png"/>
        <div class="label">linkedin</div>
      </a>
      <a href="https://app.pluralsight.com/profile/guy-yogev" target="blank" class="logo">
        <img data-src="/assets/images/pluralsight.png" />
        <div class="label">pluralsight</div>
      </a>
      <a href="https://twitter.com/guyogev" target="blank" class="logo">
        <img data-src="/assets/images/twitter.png" />
        <div class="label">twitter</div>
      </a>
    </div>
  </section>

  <!-- Blog -->
  <section class="blog anchor-offset" id="blog">
    <div class="sub-title">Blog</div>
    {% for post in site.posts %}
      {% if post.medium_url %}
        {% assign url = post.medium_url %}
      {% else %}
        {% assign url = post.url %}
      {% endif %}
      <a href="{{ url }}">
        <div class="date">{{ post.date | date_to_string }}</div>
        <div class="post-text">
          <div class="post-title">{{ post.title }}</div>
          <div class="post-subtitle">{{ post.subtitle }}</div>
        </div>
      </a>
    {% endfor %}
  </section>
</main>
