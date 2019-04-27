---
layout: post
title:  "Test Doubles For Dummies"
subtitle: "Test Doubles comes on many shapes and sizes."
description: "Test Doubles For Dummies"
date:   2017-11-15 21:29:43 +0200
css_files: []
---
**Test Doubles** is a generic term for any kind of pretend object used in place of a real object for testing purposes.

Doubles comes on many shapes and forms, and often confused between one another.
What is the difference between a dummy/mock/faker/stub?
well it doesn't really matter as long as the terminology is agreed between the team members.

At the end, Doubles are tools. The trick is to use the right one for each task.

First, we'll define the terminology.
We'll use `Jasmine`, which by its nature spies, stubs & mocks are very similar, but we'll try to pin point the differences.

Dummies
-------

A dummy is an object placeholder. It can be passed around, but never used.
It has no behavior, only state.
```javascript
describe('Vet', () => {
  let subject;
  beforeEach(() => {
    subject = new Vet()
  })

  it('test with dummy', () => {
    const dog = {};
    expect(subject.measureTemperature(dog)).toEqual('normal');
  })
})
```

Spies
-----

A Spy is an object that keeps track of its usage.
For example, it can track **which** method was called, **with what arguments**, and **how many times**.
In other words, it track **how code had run** instead of **what it did**.

```javascript
describe("Dog", () => {
  let subject;
  beforeEach(() => {
    subject = new Dog();
  })

  describe('testing with spies', () => {
    let result;
    beforeEach(() => {
      spyOn(subject, 'bark');
      result = subject.speak();
    })

    it('should bark when speaking', () => {
      expect(subject.bark).toHaveBeenCalled();
    })

    it('should bark loudly when speaking', () => {
      expect(subject.bark).toHaveBeenCalledWith(true);
    })

    it('should bark only once', () => {
      expect(subject.bark.calls.count()).toEqual(1);
    })

    it('should not call the real back method', () => {
      expect(result).toBe(undefined);
    })
  })
})
```

Stub
----

A stub is an object that doesn't know how to behave on its own.
Its methods only return what ask them to return during the test.

```javascript
describe('testing with stubs', () => {
  beforeEach(() => {
    spyOn(subject, 'bark').and.returnValue('meow');
  });

  it('should meow instead of woff', () => {
    const result = subject.speak();
    expect(result).toEqual('meow');
  });
})
```

Mocks
-----

A mock is an object with pre-programmed with inputs & outputs.
In a way, its just a more complex stub.

```javascript
describe('testing with mocks', () => {
  beforeEach(() => {
    spyOn(subject, 'stand').and.callFake(() => {
      this.sitting = true;
    });
  });

  it('sit even when stand was called', () => {
    subject.sitting = true;
    subject.play();
    expect(subject.sitting).toEqual(true);
  });
})
```

Fakers
------

A fake is a lightweight implementation of an API that behaves like the real implementation.
For example, an in-memory database that fakes a FS DB.
In a way, its just a more complex mock.

```javascript
class FakeDog {
  constructor() {}
  bark() { return "I'm barking"}
  sit() { return "I'm sitting" }
  stand() { return "I'm staging" }
  speak() { return "I'm speaking" }
  play() { return "I'm playing" }
}

describe('Dog API', () => {
  let subject;
  beforeEach(() => {
    subject = new FakeDog();
  })

it('should have methods', () => {
  expect(subject.bark).toBeDefined();
  expect(subject.sit).toBeDefined();
  expect(subject.stand).toBeDefined();
  expect(subject.speak).toBeDefined();
  expect(subject.play).toBeDefined();
  })
})

describe('Vet', () => {
  let subject;
  beforeEach(() => {
    subject = new Vet()
  })

  it('test with dummy', () => {
    const fakeDog = new FakeDog();
    expect(subject.measureTemperature(fakeDog)).toEqual('normal');
  })
})
```

When to use what?!
------------------

Now we know the difference between those tools, the trick is to choose the right one for the job at hand.

#### Prefer state testing over interactions testing

_Testing state_ means we're verifying that the code under test **returns the right results**.
_Testing interactions_ means we're verifying that the code under test **calls certain methods properly**.

At most cases, testing state is better.

*   Testing interactions doesn't necessarily tell you that your code is working properly.
*   Testing interactions leads to tests that are harder to maintain.

For example

```javascript
F = () {
  a()
  b()
  c()
}
```

*   Testing that F **calls** a, b & c will pass even if the inner functions are broken, making the test very weak.
*   refactoring a() into betterA() will cause F tests to fail.

Therefore, **spies** should be used with care.

You'll need a very good reason to choose interaction over state testing. Here are a few:

1.  Its impossible to test state. For example, you wish to test the interaction with an external module, that doesn't have a fake.
2.  Triggering the real method doesn't change the state at all. For example, a method that sends an email.
3.  Triggering the real method is expensive. For example, method that writes 1GB of data into the file system.

Additional notes:

*   If you find your system has a large amount of interaction tests, it would be a good idea to have good coverage of integration tests (such as E2E), that will validate the actual state changes.
*   Prefer testing **how** the spy was called and not **if** it was called. `expect(subject.bark).toHaveBeenCalled()` is weaker than `expect(subject.bark).toHaveBeenCalledWith(true)`.

#### Prefer real objects over Mocks/Stubs/Fakers

Our tests should be executing your code in a way that's as close as possible to production.
Therefore, you wish to avoid mocks/stubs/fakers where possible.

As a rule of thumb, go from the easy to complex. `real < stub <= mock < fake`

*   If the real object is fast and deterministic - use it.
*   If the real object isn't fast/deterministic, but simple to interact with - stub/mocks it.
*   If the real object isn't fast/deterministic, and is hard to interact with - fake it.

#### Fakers maintenance

You typically shouldn't be writing fakes often since they require maintenance.
Whenever the behavior of the real implementation changes, the fake must also be updated.

*   The team that creates the production module, should be the one that maintain the faker.
*   When creating a faker, it should usually be created at the lowest level possible. For example prefer faking a whole DB over faking all classes that access it.

Resources
---------

*   [Mocks Aren't Stubs](https://martinfowler.com/articles/mocksArentStubs.html)
*   [Jasmine](https://jasmine.github.io/2.0/introduction.html)
*   [examples](https://codepen.io/guyogev/pen/VrWJzm?editors=0010)