---
layout: post
title:  "Continuous Deployment"
subtitle: "Culture automation"
date:   2019-04-24 14:29:43 +0200
css_files: []
js_files: [index]
---

*Continuous deployment (CD)* is the practice of minimizing the time between a code change and production deployment via automation.

One may ask, is that  a good practice?

When done right, it is very powerful. When done wrong it can be catastrophic.

<p align="center" class="viz-wrapper">
  <img data-src="https://media.giphy.com/media/aQbXTcBkoXauI/giphy.gif"
       style="max-width: 50%;"/>
</p>

So how can one tell if a team can/should practice CD? At this post, I'll try to answer this question.

------------------------------------------------------------------------

### Motivation

First of all, why even bother with CD?

Small versions == small risks.

- Small changes are usually safe. They affect only a small part of the system.
- In case something goes wrong, small changes are easy to rollback/amend.

Better money/value ratio.

- Automation - spend more time on productive tasks instead of of boring manual processes.
- Fast user feedback - spend less time on things the user don't want.

### Continuous integration & delivery

Continuous integration & delivery are the building blocks of CD.
A team must master both before attempting CD.

[Continues integration](https://en.wikipedia.org/wiki/Continuous_integration) means code changes are built, tested & merged into the codebase HEAD (i.e. Git master branch) ASAP.

[Continuous delivery](https://en.wikipedia.org/wiki/Continuous_delivery) means software versions are packed, built & tested ASAP. There is always a stable version ready for deployment.

In other words:

- Continuous integration - Ensures we have a stable version from the developers POV.
- Continuous delivery - Ensures we have a stable version from the QA POV.

Merging the two creates a process where every code change is packed into a new stable version.

> A a team that use those practices is in pretty good shape. We should strive for those practices whether we are interested at CD or not.

#### Stay out of integration hell

`Integration hell` is a state when the same code behaves differently on different environments.
For example, an app that builds on one developer local machine, but fails on other machines.

<p align="center" class="viz-wrapper">
  <img data-src="https://media.giphy.com/media/UmdZRIYWK90Uo/giphy.gif"
       style="max-width: 50%;"/>
</p>

Such issues can be avoided by making sure

1. The whole dev team works on the same environments.
2. Stating environment mirror production as close a possible.

There are a number of key factors to take into account in order to build a software that can automate both integration and delivery.

#### Architecture, control & test coverage

Obviously empty test suites always pass, and never validated code works.

1. Code should be easy to test, meaning it is modular (i.e. divided into standalone modules/libs/micro-services...).
2. Every code must have sufficient code coverage.

It should be easy to control the software execution both on deploy and on run time.

1. Code should be controlled by flags (i.e. switch on/off features while under development with ENV vars or config files).
2. Be aware of run time side effects (i.e. what would happen if we rollback DB scheme change).

A code change that does not meet the above standards will suffer from regression issues.

<p align="center" class="viz-wrapper">
  <img data-src="https://media.giphy.com/media/10atLI1Qgm2WCk/giphy.gif"
       style="max-width: 50%;"/>
</p>

#### Pipeline simplicity

Continuous integration & delivery requires creating some kind of a pipeline implementation, for example

1. Merge code change with HEAD.
2. Build a version.
3. Run test suites.
4. Deploy it to a staging environment.
5. Run e2e/integration tests.
6. Run stress/load tests.

This pipeline indicates whether a version is stable or not.

Pipelines should be easy to use.
Every developer must be able to run the pipeline locally (at least the lion's share of its steps. Stress testing locally doesn't contribute much...).

Pipelines should give fast feedback.
A developer should know whether the change is OK, or at least on the right track, within a few minutes.

#### Pipeline is sacred ground

Pipeline must be consistent & robust. Always.

An issue with the pipeline must be fixed with the highest priority.

#### Agility

As mentioned above, CD is about fast paste.
If agility is not part of the team DNA, it can never achieve CD.

Moreover, trying to apply CD with non agile team most likely slow down the team.
CD would add a lot of noise in the form of bugs and inner team friction.

A Team must be small, independent, responsive, with full e2e responsibility & ownership over its work.

<p align="center" class="viz-wrapper">
  <img data-src="https://media.giphy.com/media/13i7UiKtYdZyQU/giphy.gif"
       style="max-width: 50%;"/>
</p>

A team must allow free communication, open to feedback and criticism, and must be able to translate those into responsiveness and self improvement.

> If a developer must wait days for QA & PM approval for every change, the team is not agile.

> If a developer does something because "we always did it that way", the team is not agile.

------------------------------------------------------------------------

### Moving from continuous integration & delivery to continuous deployment

Once we have automated a continuous integration & delivery pipeline, it is a short step to CD.
We just need to expand the pipeline to deploy to prod.

<p align="center" class="viz-wrapper">
  <img data-src="https://media.giphy.com/media/SLbZ0D6YoO7io/giphy.gif"
       style="max-width: 50%;"/>
</p>

But before doing so, there is one final thing consider - There is no such thing as bug-free software.

When manually deploying versions, things are watched more closely, so such failures can be caught early.
With CD, we may deploy dozens of times a day, with on human intervention.

If you use CD, at some point it will push a bad version to prod.

#### Monitoring

<p align="center" class="viz-wrapper">
  <img data-src="https://media.giphy.com/media/2cKoBysniYTYY/giphy.gif"
       style="max-width: 50%;"/>
</p>

The team must be able to monitor the software performance on real time.
When things go sideways, it should detect and fix the issue ASAP.

> CD allows every developer to deploy to prod, therefore every developer must know how to monitor the software.

Team must have an on-call rotation that reacts to failures 24/7.

#### User perception

One of the greatest advantage of CD is fast feedback.

When UX bad, it is reported by the users (i.e. users are not happy with our new feature, or report a bug).

1. There must be simple way for a user to provide feedback.
2. Feedback must reach & processed by the team ASAP.

It also should be asked, do users appreciate this QA role we force upon them?

"Users as QA" is a luxury enterprises such as FB or WhatsApp can afford.
They have millions of users, they can make sure a change only affect a subset of them before reaching the whole world (A/B testing, Green/Blue, canary versions...).

At worst case, some of their captive users are unhappy for a while. Not ideal, but its a calculated risk.

However, if I have only a 100 users and 5 market competitors, maybe relying on my users patience is an unnecessary risk.
Waiting till the product is more mature may be a better approached.

<p align="center" class="viz-wrapper">
  <img data-src="https://media.giphy.com/media/2xEzi32w6cLCgmAa6p/giphy.gif"
       style="max-width: 50%;"/>
</p>

------------------------------------------------------------------------

### Summery

CD is not easy to achieve.

While here are many tools and services that can assist, CD is not a tool setup a team can fire & forget.

It is an automation that encapsulate the team ethic and culture.

#### Additional readings

- [Architecting continuous delivery](https://www.thoughtworks.com/insights/blog/architecting-continuous-delivery)
- [10 commandments of continuous delivery](https://techbeacon.com/devops/10-commandments-continuous-delivery)
- [Prerequisites for successful enterprise continuous delivery implementation](https://www.cloudbees.com/blog/prerequisites-successful-enterprise-continuous-delivery-implementation)
- [Prerequisites for continuous integration/](http://renderedtext.com/blog/2012/11/12/prerequisites-for-continuous-integration/)
- [Continuous integration requirements](https://www.tutorialspoint.com/continuous_integration/continuous_integration_requirements.htm)