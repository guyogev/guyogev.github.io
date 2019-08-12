---
layout: post
title:  "Code Review"
subtitle: "Code Review subtitle"
description: "Effective code review tip "
date:   2019-08-12 14:29:43 +0200
css_files: []
js_files: [index]
---

Code review (CR) is the methodology of changing the codebase while keeping the
code healthy.

At one side, we have the developer/s, who's job is to complete a code change while
keeping track on time constraints.

On the other side, the reviewer/s job is protecting codebase from degradation.

Its the best interest of all participants that CR would be fast, without compromising quality.
At this post, I'll try to describe some guidelines to achieve this goal.

### Code health

The overall quality of a codebase is called `Code health`.
A healthy code is:

- Simple - easy to follow & understand.
- Maintainable - easy to change.

Teams with healthy code have high code velocity, and low frustration levels (
from the team, clients and users).

A project with low code health are most likely somewhere on the path for failure:

1. Bugs that are difficult to debug.
2. Extreme effort to make simple changes.
3. Long iteration times (slow tests, slow releases, slow builds...).
4. Long time to fix/react to users feedback
5. Burnout & frustration (users, owners & developers)
6. Rewrite / Deprecation...

### Types of code reviews

There are many [methodologies of code review](https://en.wikipedia.org/wiki/Code_review).
I find "Email pass-around" the most effective. At this method,

1. The developer who wish to submit a code change sends a request via a code
review system (i.e a pull request).
2. Reviewers are notified via email that there is a review pending.
3. The reviewer give feedback.
4. The system notifies the developer his attention is needed.
5. Repeat 2-4 till reviewer approves the code change.

This approach has a few advantages:

1. Flexibility - Developer & reviewer can work separately.
2. Scale - Good fit for large teams. Developer & reviewer can be on different offices & timezones.
3. Documentation - Feedback history is tracked via the CR system.
4. Sincerity - Some people may feel uncomfortable  & hold back feedback under formal inspection.

### Code review speed

For agile teams, CR is one step in the development pipeline.

Slowing a single step by definition reduce the team productivity because it
blocks later steps (i.e. our QA team waits for feature to be completed before
e2e test automation can be finished).

Additionally, slow CR means code changes are pending for a long time, increasing
the changes of merge conflicts and QA regressions.

Finally, when time is of the essence and corner cutting is needed, slow CR is
one of the first steps to go our the window...

### Code review guidelines

CR is all about compromises. There is no such thing as "perfect code".

The developer may need to swallow his pride and make changes to the code
he does not agree with.

The reviewer may need to do the same and admit the
developer code is not that bad after all (even thou it is well known the worst
code is written by others).

The most important rule of CR is

    Reviewers should approve code submission at the moment it improves the overall project code health.

Obviously this moment is subjective.

We can make things more objective by adding a few more rules.

#### Prefer factual data over personal preference

For example, a while back I came across a debate during code review on the best
way to verify a string contains a whitespace.

```javascript
str.split(' ').length === 1;
```

Vs

```javascript
str.includes(' ');
```

Luckily, there are ways to get empirical data and resolve the matter by
[testing it](https://jsperf.com/string-split-vs-includes).

#### Prefer style guides over personal preference

Some developers like [indenting using tabs, others white spaces](https://www.youtube.com/watch?v=SsoOG6ZeyUI).
Using a style guide reduces such conflicts.

No need to invent the wheel here, there are
many style guides out there, for example [google](http://google.github.io/styleguide/) & [airbnb](https://github.com/airbnb).
Adapt one the team can agree upon.

#### CR tooling

When there are well defined rules on how code should be written, we can enforce
them automatically. Static code analyses can reduce CR noise drastically.

- Linters verify the code is compliant with the style guide.
- Spell checkers would verify your code understandable.
- Static code analyses can catch known issues and bad practices.

#### Avoid large code changes

Studies shows that

- 200-400 lines of code can be reviewed effectively in an hour.
- Review session should be no more than 1 hour.

Avoid sending massive code change to review.
Instead, split the changes into smaller bite size chunks.

#### Avoid long discussions

When submitting code for review, make it easy for the reviewer to understand what
you've done. Think ahead of what questions he may ask, and add them to the review
request (i.e to the git commit message or pull request)

- Provide context
  - What does this change do?
  - Why is it needed?
  - Add a link to the relevant issue/bug at the task tracking system.
  - Add a snapshot/video/demo of the change in action.
- minimize code changes during the review to prevent double work for the reviewer.
  - Broken tests means the code not final.
  - Sync to the latest HEAD to reduce merge conflicts.

When reviewing code, do it all and do it well.

As a general rule, the feedback loop should be fast. 1-2 cycles should cover it.
If more cycles are needed, prefer to move discussions to f2f meeting.

#### Resolve conflicts ASAP

When the developer and reviewer disagree on a matter, it should be resolved fast.

- When in doubt, stay consistent with the current way the team works.
- Ask for a 2nd reviewer to give his opinion and make a call.

### What to look for during code reviews

While reviewing a code change, the are a number for aspects we can focus on.

#### Design

- Code review **is not** the place for system design review.
  - Such planning & review should be done before implantation (well... duh...).
- Is this change needed?
- Should this change be a part at a separate module?
  - I.e. a util library
- Is it a good time to apply such changes?
  - I.e the change may hurt product usability PM does not want at the moment.

#### Functionality

- Code review **is not** a QA session.
- Does this change does what the developer intended to do?
- Does the code run?
  - Ask for a short demo / screenshots
- Does the code cover edge cases?
- Should the code handle invalid inputs & exceptions?

#### Complexity/Readability

- Does the code follow the style guide?
- Is this code over engineered?
  - [YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)
- Is the code easy to follow?
  - [ABC](https://en.wikipedia.org/wiki/ABC_Software_Metric)
- Is the code easy to read?
  - I.e meaningful method names.
- Is the code easy to understand?
  - Can the code be simpler?
  - Would comments be helpful?
- Does the modules have proper documentation?
  - Docs are not the same as inline code comments.

#### Testing

- Does the code include test coverage?
  - Prefer to add tests coverage along with the production code code submission
- Are the tests clear?
- Would the tests fail when the code is broken?
  - I.e. cover edge cases.
- Are the tests robust?
  - I.e would a change to the production code force changes to the test too.
- Is the test code healthy?
  - Tests are code too.

### How to be a good reviewer

Good reviewers are great assets for the team.
Its important to be able to pass judgment without stepping teammates toes.

- A Good reviewer is thorough
  - Pace yourself. Know how much code you can review and for how long before loosing focus.
    - CR at the first chance you get. Don't let other wait for your replays.
    - CR with no massive rejects should be over within a single workday.
  - Understand the code.
    - If you can't understand the code, most likely others would not too. Ask for code changes, explanations.
- A Good reviewer is kind
  - Be polite.
  - Give positive feedback too.
- A good reviewer is informative
  - Explain why a fix you requested is needed.
  - Point to relevant sources and documents.
  - Divide your comments severity levels
    - Must fix ("This function doesn't handle input edge cases, please improve")
    - Consider changing ("Consider moving this method into our util module")
    - TODO ("This is good for now, but may surface issues at larger scales. Lets open a follow up task for it")
- A good reviewer is a mentor
  - Don't just ask for a fix, point to the right direction.
    - Bad - "This code runtime complexity is terrible. Please find a better solution"
    - Good - "This method is a O(n^2). I think sorting the input would improve it"
- A good reviewer shows trust
  - Avoid double questioning the developer reasoning.
  - Assume the developer has done his research, don't question based on "feeling", instead provide data/solutions.
    - Bad - "Have you tried Googling this error message?"
    - Good - "I've came across this error before, maybe this link may help?"
