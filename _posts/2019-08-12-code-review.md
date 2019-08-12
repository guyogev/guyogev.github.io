---
layout: post
title:  "Code Review"
subtitle: "Code Review subtitle"
description: "Effective code review tip "
date:   2019-08-12 14:29:43 +0200
css_files: []
js_files: [index]
---

Code review (CR) is the process of changing the code base, while keeping the code healthy.

At one side, we have the developer, who's job is to complete a code change while
keeping track on the time constraints.

On the other side, the reviewer job is protecting code base from degradation.

Its the best interest of all participants that CR would be fast, without compromising quality.
At this post, I'll try to describe some guidelines to achieve this goal.

### Code health

The overall quality of a code base can be is also known as `Code health`.
A healthy code is:

- Simple - easy to follow & understand.
- Maintainable - easy to change.

Teams with healthy code have high code velocity, and low frustration levels (
from dev, clients and user).

A project with low code health are most likely somewhere on the path for failure:

1. Bugs that are difficult to debug.
2. Extreme effort to make simple changes.
3. Long iteration times (slow tests, slow releases, slow builds...).
4. Long time to fix/react to users feedback
5. Burnout & frustration (users, owners & developers)
6. Rewrite / Deprecation...

### Code review speed

For agile teams, CR is a step of the development pipeline. Slowing a pipe line step
is by definition reducing productivity because it blocks later steps (i.e. our QA team).

Additionally, slow CR means code changes are pending for a long time, increasing
the changes of merge conflicts and QA regressions.

Finally, when time is of the essence and cutting corners is needed, slow CR is one of
the first steps to go our the window...

### Code review guidelines

CR is all about compromises. There is no such thing as "perfect code".
The developers may be required to swallow his pride and make changes to the code
he may not agree with. The reviewer may need to show do the same and admit the
developer code is not that bad after all (even thou it is know the worst code is
always written by others).

The most important rule of CR is

    Reviewers should approve code submission **at the moment** it improves the overall project code health.

Obviously this moment is subjective.

We can make things more objective by adding a few more rules.

#### Prefer factual data over personal preference.

For example, a while back I came across a debate during code review on the best
way to verify a string contains a whitespace.

```javascript
str.split(' ').length === 1;
```

Vs

```javascript
str.includes(' ');
```

Luckily, there are ways to get empirical data and resolve the matter by [testing it](https://jsperf.com/string-split-vs-includes).

#### Prefer style guides over personal preference

Some developers like [indenting using tabs, others white spaces](https://www.youtube.com/watch?v=SsoOG6ZeyUI).
using a style guide reduce such conflicts. No need to invent the wheel here, there are
many such guides out there, for example [google](http://google.github.io/styleguide/) & [airbnb](https://github.com/airbnb).

#### Avoid long discussions

When submitting code for review, make it easy for the reviewer to understand what
you've done. Think ahead of what questions he may ask, and add them to the review
request (i.e to the git commit message)

- Provide context
  - What does this change do?
  - What is it needed?
  - Add a link to the relevant issue/bug.
  - Add a snapshot/video/demo of the change in action.
- Linters may enforce style guides.
- minimize code changes during the review to prevent double work for the reviewer.
  - Broken tests means more code not final.
  - Sync to the latest HEAD to reduce merge conflicts.

As a general rule, prefer to move discussions to f2f meeting.

When reviewing code
