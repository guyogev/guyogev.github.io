---
layout: post
title:  "Where Do HTML Pages Come From?"
subtitle: "Rendering location matters."
date:   2018-08-15 14:29:43 +0200
css_files: []
---

Web apps come in all shapes and sizes, but they all have one thing in common -
they render content a web browser with HTML.

Where this HTML code is generated is defined by the chosen architecture:

**Server-Side Rendering (SSR):**
- The HTML is generated at the server, and pass down to the client.

**Client Side Rendering (CSR):**
- Only a basic HTML response is passed down.
- Using JS, additional HTML code is generated and added to the DOM.

Some say the first is heavenly, and the latter is satan creation, while others feel
the complete opposite. But like everything in life, each has its pros and
cons.

#### Page Load time

With SSR, the browser just needs to parse the HTML and apply its style. This is
what browsers at optimized for.

CSR requires additional work from the browser after the initial HTML is parsed
and rendered. It loads JS, execute it, which in turn manipulate the dom (maybe
even block rendering till more data is fetched from the server). A
lot can be done... and this can be quite a bottleneck.

Also, since we ask the user device to perform fewer tasks, we also are more
compatible with low-end devices.

#### Search Engine Optimization
Web crawlers can easily read the HTML content. This is how to search engines and social
media network scan and categorize pages. If we want our page to be
found/shared easily, it should be SEO.

SSR makes a crawlers job easy, everything is visible right away.
CSR requires the crawlers to execute the JS, in order to let the page fully
load. Sadly, not all crawlers support such functionality.

#### User interactions
When the user interacts with the app, the UI changes. For example, a user may
click a button that expands a list content.

Such change with CSR is easy to do. when the user clicks the button we request
for the data from the server, and manipulate only the list by executing JS
method.

SSR doesn't handle small UI changes. it makes a request to the server, which in turn
respond with a whole HTML page, where the only small diff is the expanded list.
We ask the browser to redo a lot of work for a very little change.

### So... how to choose?

When we start a new project, we select our tools and stack. It is very tempting
for developers to debate over and then choose SSR/CSR, but while doing so it is
important to take all the factors into consideration.

While load time and SEO are mostly considered as Eng realm, we do need to
listen to our UX designers and understand what they have in mind.

We should define our **product requirements**, and then choose which stack is
better for our case. A strong team can overcome any challenge presented to it,
however choosing the wrong tools usually means we are solving issues that
we could have avoided.

As rule of thumb, I feel that the more complex the UX is, the stronger is the
indication we should choose CSR.

At one end of the scale there are static pages:
- Everything on the page is predefined.
- All style can be implemented with CSS.

Clearly, SSR is the to stack.

On the other end, the complex UX apps (i.e. interactive games) are easier to
build with CSR.
- Lots of JS logic, the app is not usable till JS executes.
- May require a lot of interactions between the client/server.

In the real world, not everything is black and white. Chances are that an app doesn't strictly match any of the above cases.

At [Michael Bleigh's post]((https://blog.usejournal.com/when-should-i-server-side-render-c2a383ff2d0f)),
he provides a very storing indicator which way to should go when its hard to
decide.

### Bridging The Gap
Once the decision is made, it doesn't mean we should accept our doom. We can
have both - a great complex UX that are fast to load, no matter what stack we
chose. It's just easier to achieve when we have a good starting point.

Some SPA frameworks provide ways to generate the initial HTML at the server
side, and letting the client side app take over once the page loads (hence
improving the page load time and allowing SEO). Those are known as
`Universal Apps` For example:

- [Angular Universal](https://angular.io/guide/universal)
- [ReactDOMServer](https://reactjs.org/docs/react-dom-server.html)
- [NUXT](https://nuxtjs.org/)

Static pages also can achieve better UX by executing JS to the pre-rendered
page.

 - [Stimulusjs](https://stimulusjs.org/) is a JS framework for SSR apps.
 - [Turbolinks](https://github.com/turbolinks/turbolinks) avoid the
 full-page-refresh experience.


### living with the decision

Choosing the stack is just a starting point of a long road.

Choosing wisely may leads to happier & more productive team.

Now go and build something great :)
