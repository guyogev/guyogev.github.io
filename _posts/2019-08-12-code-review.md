---
layout: post
title:  "Code Review Speed"
subtitle: "Guidelines for fast & effective code review"
description: "Increasing code velocity and team satisfaction via effective code review process"
date:   2019-08-12 14:29:43 +0200
css_files: []
js_files: [index]
medium_url: https://medium.com/@guyogev/building-code-review-speedguy-yogev-50b0080b177
---
#### Building Code Review Speed - Guidelines for Fast & Effective CR

Code Review (CR) is the methodology of changing the codebase while keeping the
code healthy.

On one end of this process, we have the developer whose job is to complete a code change
while meeting deadlines. On the other side, we have the reviewer whose job is protecting the codebase from degradation.

It’s in the best interest of all that CR will be fast without compromising quality. In this post, I'll describe some guidelines toward achieving this goal.

### Code Health

The overall quality of a codebase is called “Code health.”
A healthy code is:

- Simple - easy to follow & understand.
- Maintainable - easy to change.

Teams with healthy code have high code velocity, and low frustration levels
(of the team, clients and users).

A project with low code health is most likely somewhere on the path to failure. It could include:

1. Bugs that are difficult to debug.
2. A massive effort even for simple changes.
3. Long iterations (slow tests, slow releases, slow builds).
4. A long time to fix/react to users feedback.
5. Burnout & frustration (by users, owners & developers).
6. A project rewrite/deprecation.

### Types of CRs

There are many [methodologies of code review](https://en.wikipedia.org/wiki/Code_review).
I find "email pass-around" the most effective. For this method:

1. The code writer sends a request via a code review system (i.e a pull request).
2. Reviewers are notified via email that there is a review pending.
3. The reviewer gives feedback.
4. The system notifies the developer that his or her attention is needed.
5. Phases 2 through 4 are repeated until the reviewer approves the code change.

This approach has a few advantages:

1. Flexibility - the developer & reviewer can work separately.
No need to find time slots in where all participants are free.
2. Scale - Good fit for small & large teams. The developer & reviewer can be in different offices & timezones.
3. Documentation - Feedback history is tracked via the CR system.
4. Sincerity - Some people may feel uncomfortable & hold back feedback under formal inspection.

### Building Code Review Speed

For agile teams, CR is one step in the development pipeline.

By slowing down a single step, this can reduce the team’s productivity because it
blocks later steps (i.e. our QA team waits for a feature to be completed before
the e2e automation test can be finished).

Additionally, slow CR means code changes are pending for a long time, increasing
the possibility of code-merge conflicts and QA regressions.

Finally, when time is of the essence and corner cutting is needed, slow CR is
one of the first steps to go out the window.

### CR Guidelines

CR is all about compromises. There is no such thing as the “perfect code.”

Developers may need to swallow their pride and make changes to the code
they do not agree with.

Reviewers may need to do the same and admit that the developer code is not that bad after all (even though it is well known that the worst code is written by others).

The most important rule of CR is:

    Reviewers should approve the code submission when it improves the overall code health.

Obviously, when this moment occurs, it is subjective.

We can make things more objective by adding a few more rules:

<p align="center" class="viz-wrapper">
  <img data-src="https://media.giphy.com/media/MWDLf1EIUsoNy/giphy.gif"
       style="max-width: 50%;"/>
</p>

#### Avoid Personal Preferences

Some developers like [indenting using tabs; others white spaces](https://www.youtube.com/watch?v=SsoOG6ZeyUI).

<p align="center" class="viz-wrapper">
  <img data-src="https://media.giphy.com/media/26BRrSvJUa0crqw4E/giphy.gif"
       style="max-width: 50%;"/>
</p>

Using a style guide reduces such conflicts. There’s no need to re-invent the wheel here. There are plenty of style guides out there, for example [google](http://google.github.io/styleguide/)
& [airbnb](https://github.com/airbnb). Adopt one that the team can agree on.

For some things, even a style guide won't offer you clear answers.
In such cases, try make your case with hard data.

For example, a while back I came across a debate about CR that focused on the best
way to verify if a string contains a whitespace.

```javascript
str.split(' ').length === 1;
```

Vs:

```javascript
str.includes(' ');
```

Luckily, there are ways to get empirical data and resolve the matter by
[testing it](https://jsperf.com/string-split-vs-includes).

#### Use CR Tools

When there are well-defined rules on how code should be written, we can enforce
them automatically. Static code analyses can reduce CR noise drastically.

- Linters verify that the code is compliant with the style guide.
- Spell checkers verify that your code is understandable.
- Static code analyses can catch known issues and bad practices.

#### Avoid Large Code Changes

Studies shows that:

- 200-400 lines of code can be reviewed effectively per hour.
- A review session should be no more than 1 hour.

More than that, and people will get tired and out of focus. Plus, the CR quality will likely drop.

Avoid sending massive code changes to review. Instead, split the changes into smaller bite-sized chunks.

#### Avoid Long Discussions

When submitting code for review, make it easy for the reviewer to understand what
you've done. Think ahead of questions he or she may ask, and add the details to the review
request (i.e to the git commit message or pull request).

<p align="center" class="viz-wrapper">
  <img data-src="https://media.giphy.com/media/txwApACLIXlh6/giphy.gif"
       style="max-width: 50%;"/>
</p>

- Provide context
  - Ask yourself what does this change do?
  - Why is it needed?
  - Add a link to the relevant issue/bug in the task tracking system.
  - Add a snapshot/video/demo of the change in action.
  - Minimize code changes during the review to prevent double work for the reviewer.
  - Know that broken tests means the code is not final.
  - Sync to the latest HEAD to reduce merge conflicts.

When reviewing code, do it all in one go, and do it well.

As a general rule, the feedback loop should be short. One or two cycles should cover it.
If more cycles are needed, prefer to move discussions into a face-to-face meeting.

#### Resolve Conflicts ASAP

When the developer and reviewer disagree on a matter, it should be resolved quickly.

- When in doubt, stay consistent with the current way the team works.
- Ask for other reviewers to give their opinions and make a call.

### What to Look for During CRs:

<p align="center" class="viz-wrapper">
  <img data-src="https://media.giphy.com/media/iAYupOdWXQy5a4nVGk/giphy.gif"
       style="max-width: 50%;"/>
</p>

While reviewing a code change, there are a number of aspects to focus on.

#### Design

- Code review **is not** the place for system design review. Such planning & review should be done before implantation (well... duh?).
- Is the change really needed?
- Should this code be part of a separate module (i.e. a util library)?
- Is it a good time to apply such changes? (i.e. the change may hurt product usability, and the PM does not want risks at this time).

#### Functionality

- Code review **is not** a QA session.
- Does this change do what the developer intended it to do?
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
- Is the code easy to read? (i.e. does it include meaningful method names?)
- Is the code easy to understand?
  - Can the code be simplified?
  - Would comments be helpful?
- Does the modules have proper documentation?
  - Docs are not the same as inline code comments.

#### Testing

- Does the code include test coverage?
  - Prefer to add test coverage along with the production code submission.
- Are the tests clear?
- Could they fail when the code is broken? (Do they cover edge cases?)
- Are the tests robust? (i.e. would a change to the production code force changes to the test too?)
- Is the test code healthy?
  - Tests are code too.

### How to be a Good Reviewer

Good reviewers are great assets for any team. It’s important to be able to pass judgment without stepping on the toes of your teammates.

<p align="center" class="viz-wrapper">
  <img data-src="https://media.giphy.com/media/nnpJvJLyZ8op2/giphy.gif"
       style="max-width: 50%;"/>
</p>

#### A Good Reviewer is Thorough

- Pace yourself. Know how much code you can review and for how long before loosing focus.
- CR at the first chance you get. Don't let others wait for your replays.
- Understand the code. If you can't, most likely others would not be able to as well. Don’t be afraid to ask for code changes and explanations.

#### A Good Reviewer is Responsive

- CR with multiple feedback loops should be over within a single workday.

#### A Good Reviewer is Kind

- Be polite.
- Give positive feedback too.

#### A Good Reviewer is Informative

- Explain why a fix you requested is needed.
- Point to relevant sources and documents.
- Divide your comments into severity levels.
  - Must fix (“This function doesn't handle input edge cases, please improve.”)
  - Consider changing (“Consider moving this method into our util module.”)
  - TODOs (“This is good for now, but could issues surface during larger scales. Let’s open a follow up task for it.”)

#### A Good Reviewer is a Mentor

- Don't just ask for a fix, point in the right direction.
  - Bad - “This code runtime complexity is terrible. Please find a better solution.”
  - Good - “This method is a O(n^2). I think sorting the input would improve it.”

#### A Good Reviewer Shows Trust

- Avoid second-guessing the developer’s reasoning. Assume the developer has done his or her research. Don't question based on your “feeling.” Instead, provide data or solutions.
  - Bad - “Have you tried Googling this error message?”
  - Good - “I came across this error before, maybe this link could help you?”
