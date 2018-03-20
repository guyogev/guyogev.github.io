---
layout: post
title:  "Web browsers performance goodies"
subtitle: "Stop that jank!"
date:   2017-12-14 21:29:43 +0200
css_files: [global, post]
---
As web developers we create amazing apps.  
We have many tools in our arsenal - frameworks, libraries, extensions...  
But at the end, it all reach the same place - The browser.

A `web browser` is a software application for retrieving & presenting web pages.  
At this blog post, we'll focus on optimizing the latter.

### UX & FPS

When the user interact with the app, we want him to get a nice smooth user experience (UX).  
There are two aspects to consider when it comes to UX

#### Respondents

Humans tend to feel something is `off` or `janky` when the response time between the action (click a button),  
and the result (a popup appears) takes more than about 100ms.

Therefore our app respond time should be bellow 100ms - JS that affects the UI need to be completed fast.

#### FPS

Most modern webpage use animations. Animation is a series of images, changing over time.  
The human brain processes around 30 images per second. Animations are measured with Frame Per Second (FPS).  
When the images change at a low FPS rate, the animation looks `janky`, which is bad UX.

Most screens & monitors can display images at 60 FPS, which is around 16ms per frame.

Therefore we want to Keep our FPS at 30-60 range.

### The Browser Tasks

While the browser runs our code, it has other tasks to do as well.  
For instance, creating the view:

*   Style calculation - Decide which style affects which element on the page.
*   Layouts - Decide where each element is located
*   Compositing - Decide which element is in front of the other.

Those tasks can take a while to complete, so out of the 16ms we have for each frame, we can use only about 10ms.

Usually, the most time consuming parts of our apps are JS.  
If our JS code runs slowly, the browser will not be able to complete the frame in time, dropping the app FPS rate.

### Light Events

As we said before, we want the app to be responsive.  
For example, when the user scrolls up and down, we want smooth motion.

User actions reach our app by `listeners`, which triggers callbacks we define.  
If the callbacks take too long to complete, it will directly affect the app respond time.

Say we have an angular app that looks something like
```HTML
<div ng-mousemove='onMouseMove($event)'>
  {{height}}
</div>
```
```javascript
scope.onMouseMove = (e) => {
  timeConsumingTask(); // JS code that takes 200ms to complete
  $timeout(() => {
  // changes that affect the UI.
  ...
  }, 0);
}
```

We'll, obviously, if `timeConsumingTask` takes 200ms the user will notice.

We can improve that a bit.  
There is no need to run `onMouseMove` on every px change. Events can fire more than 30 time per second,  
which is too fast for humans to notice anyhow.  
We can `debounce` events - react only to a single event once in a while.

The second thing we can do is make sure the `timeConsumingTask` will not block the browsers from  
completing other tasks that react to the event (such as scrolling down the page or moving the curser).

We'll move `timeConsumingTask` into our async timeout block.
```javascript
scope.doMove = (e) => {
  $timeout(() => {
    timeConsumingTask(data); // JS code that takes 200ms to complete
    // changes that affect the UI.
    ...
  }, 0);
}
  
scope.onMouseMove = _.debounce(scope.doMove, 16);
```

### Workers

Even thou we've made some improvement, we still have a problem. `timeConsumingTask` is running on our main thread,  
which is the one responsible for all the UI changes too.

`timeConsumingTask` will not interfere with the browser's events flow, but still has heavy impact on the UX.

To improve that, we can ask a `Worker` to share the load, and run this task on other thread.
```javascript
worker = new Worker("worker.js");
    
scope.onMouseMove = (e) => {
  // the worker will run `timeConsumingTask` and let us know when he's done
  worker.postMessage(data); 
  worker.onmessage = (e) => {
    console.log('data processed!');
  };
  
  $timeout(() => {
  // changes that affect the UI.
  ...
  }, 0);
}
```

### Forced Reflow

Sometimes we do want JS to make changes to the page.  
Since workers can't access the DOM, we must run the code on the main thread.
```javascript
const children = element.children();
  for (i = 0; i < children.length; i++) {
  const c = children[i];
  let width = parseInt(c.style.width, 10);
  if (c.offsetWidth < 1000) {
    c.style.width = `${width + 1}%`;
  }
}
```

This piece of code looks pretty harmless, but does something awful to the browser.  
`c.offsetWidth` reads a layout property from an element, so the browser must calculate the page layout.  
Then `c.style.width` makes a change to the element style, affecting the page layout.  
On the next loop iteration, the page layout is outdated, so `c.offsetWidth` forces the browser to calculate the layout again.

This pattern is called `Forced Synchronous Layouts`.

To make the browser job easier, we make sure loops only **reads** or **writes** style properties.
```javascript
const filtered = [];
// Read
for (i = 0; i < children.length; i++) {
  const c = children[i];
  if (c.offsetWidth < 1000) {
    filtered.push(c)
  }
}
let width;
// Write
filtered.forEach((c) => {
  width = parseInt(c.style.width, 10);
  c.style.width = `${width + 1}%`
});
```

It is important to note that not every style change will trigger layout re-calculations.  
For example, changing the background-color will not affect layout.

### Run the right time

CSS can do animations, but sometimes we want JS to create animations instead.  
At such cases, we should start our style calculations at the right time.
```javascript
doAnimation = () => {
  if (animationCompleted) {
    clearInterval(interval);
  }
  // do some styling
}
    
// assume `doAnimation` will be completed in less than 10ms
interval = setInterval(doAnimation, 10);
```

`doAnimation` takes about 10ms out of our allocated 16ms per frame.  
but what will happen if an iteration of `doAnimation` will start at the end of the 16ms block?  
The animation will not complete its calculation by the time the frame should be rendered.

we can ask the browser to fire our `doAnimation` iteration at the start of the frame block by `requestAnimationFrame`,  
which triggers a callback at the next frame start.
```javascript
doAnimation = () => {
  if (animationCompleted) {
    return;
  }
  // do some styling and schedule to run at next frame
  requestAnimationFrame(doAnimation);
  }
  
  requestAnimationFrame(doAnimation)
```

### Resources

*   [Rendering Performance](https://developers.google.com/web/fundamentals/performance/rendering/)
*   [CSS Triggers](https://csstriggers.com/)
*   [Code snippets demos](https://github.com/guyogev/client-optimizations-playground)