# Personal code of conduct

## Table of Contents

- [Personal code of conduct](#personal-code-of-conduct)
  - [Table of Contents](#table-of-contents)
  - [Code quality](#code-quality)
    - [DRY](#dry)
    - [YAGNI](#yagni)
    - [KISS](#kiss)
    - [Crash early](#crash-early)
    - [Testing](#testing)
  - [Project quality](#project-quality)
    - [Solution Architecture](#solution-architecture)
      - [Planning phase](#planning-phase)
      - [Documentation phase](#documentation-phase)
      - [Implementation phase](#implementation-phase)
    - [Tech debt](#tech-debt)
    - [Code review](#code-review)
    - [Security](#security)
    - [Tasks management](#tasks-management)
  - [Productivity](#productivity)
    - [Power user](#power-user)
    - [10X Developer](#10x-developer)
  - [Growth](#growth)
  - [Additional Resources](#additional-resources)

---

## Code quality

### DRY

Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.

1. The third time you write the same piece of code, extract it into a its own module.
2. Avoid code comments. Create readable self-documenting code by adapting known programming style guides.
3. If and when code documentation is required, auto generate it from the code.
4. Normalize data.

- [WET code and project rot
  ](https://medium.com/@guyogev/wet-code-and-project-rot-bcc2e23e855)
- [Code reusability levels
  ](https://medium.com/@guyogev/wet-code-and-project-rot-bcc2e23e855)

### YAGNI

The more code you have, the more bugs it would generate.

1. Don't add code you unless you are sure it is needed.
2. If you find it helpful, leave an informative TODO instead.
3. Never comment out code. Just delete it.

- [wikipedia](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)

### KISS

Simple is better.
Code should be easy to understand and test.

1. Prefer stateless & side effect free code.
2. Prefer correct code over fast. Don't pre-optimize.
3. Avoid globals.
4. Avoid APIs changes. Minimize cascading changes.
5. Reduce code complexity. 30 LOC for methods, 500 for files.
6. Avoid logic in constructors.

### Crash early

Don't allow cascading damage.

When something breaks, it must be easy to pin point the cause.

1. Define strict inputs/outputs for methods/modules.
2. Validate inputs data.
3. Think defensively. What can go wrong, and how to prevent it.
4. Write informative logs. make it clear What, Where & Why something happened.

### Testing

A bad test can be worst than no test.

Debugging is more time consuming than writing tests.

1. Test behavior, not implementation.
2. Test only public APIs. A need to test private API is code smell, extract it into its own module, with a public testable API.
3. adapt TDD workflow.
4. Tests should be easy to follow & understand. Compromise DRY in favor of readably.
5. Strive to test all code paths.
6. Regularly generate a test coverage reports, and keep the numbers high.
7. Use tests as code docs. Write informative, small scoped, well named tests.
8. Make sure every added test actually works. Plant a bug, and verify the test doesn't give false positive result.

---

## Project quality

### Solution Architecture

Would you feel safe on plane with no construction specification?

#### Planning phase

Even minor change in requirements can have drastic effect on system design.

1. All requirements must be well defined.
2. Understand what the business goals are.
3. Understand what are the functional requirements.
4. Understand what are the none functional requirements (usage load, data volume, SLA)

#### Documentation phase

1. Doc should be readable to Dev team
2. Prefer Human readable text and PPT over UML diagrams.
3. Defines the tech stack.

#### Implementation phase

1. Design is not set in stone. Dev may find mistakes and raise issues.
2. Verify the architecture is implemented correctly, on a weekly base.

- [Osim Tochna e63| The architect](https://www.osimhistoria.com/software/osim-tochna-63)

### Tech debt

Tech debt is just as important as a new feature.

Over time, accumulated tech debt slows development, grinds team motivation, and produce bad products.

1. Keep track of tech debt. Open tasks and link to TODOs.
2. If it takes a few minutes to complete, just do it.
3. Failing/flaky test suites are highest priority.

### Code review

CR must be fast, without compromising code quality.

1. Approve code once it improves the overall code health.
2. Enforce languages style guide and documented best practices.
3. Detect issues automatically with tools (linters, spell checkers, static code analyzers...)
4. Be kind, learn from others, give thanks & praises.
5. Avoid big changes, 200-400 LOC max.
6. CR is high probity. Don't let others be ideal waiting for you.
7. Make clear, small, single-purpose commits, with meaningful commit messages.

- [Google Style Guides
  ](https://google.github.io/styleguide/)
- [Conventional Commits
  ](https://www.conventionalcommits.org/en/v1.0.0/) & [husky](https://www.npmjs.com/package/husky)

### Security

1. Use a password manager.
2. Never share passwords.
3. Never add secrets to git repository.

- [bitwarden](https://bitwarden.com/)
- [git-secrets](https://github.com/awslabs/git-secrets)

### Tasks management

1. Manage all tasks in one place/tool.
2. Predefine tasks templates.

- [Awesome | github templates](https://github.com/devspace/awesome-github-templates)

---

## Productivity

Minimize the effort, maximize the value.

### Power user

1. Master at least one IDE
2. Be proficient with at least terminal based IDE.

### 10X Developer

1. Understand the task at hand. What it the requirement, Why is it needed & by when.
2. Perfection is your enemy. Know when its good enough, and let it go.
3. Automate repetitive tasks with scripts.
4. Maintain dotfile repo for fast system setup.

- [The 10X Developer
  ](https://medium.com/@guyogev/the-10x-developer-7e47c96bc8e4)
- [Awesome dotfiles](https://github.com/webpro/awesome-dotfiles#readme)
- [guyogev/dotfiles](https://github.com/guyogev/dotfiles)

## Growth

1. Fill ideal time with content (read on the bus, catch a podcast while doing dishes...)
2. Balance knowledge investment.
3. Know where the rest of the industry is.
4. Invest at least 10 minutes a day to probe for new material. Keep a list of findings to get back to.
5. Subscribe to weekly newsletters & digests.
6. Be a giver.

- [Are you a giver or a taker | Adam Grant](https://www.ted.com/talks/adam_grant_are_you_a_giver_or_a_taker?utm_campaign=tedspread&utm_medium=referral&utm_source=tedcomshare)
- [State of JS](https://stateofjs.com/)

---

## Additional Resources

- [30 best practices for software development and testing](https://opensource.com/article/17/5/30-best-practices-software-development-and-testing#comments)

- [Pragmatic Programmer](https://github.com/HugoMatilla/The-Pragmatic-Programmer)

- [Awesome](https://github.com/sindresorhus/awesome)

---
