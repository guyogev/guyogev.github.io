---
layout: post
title:  "Test Suite Robustness"
subtitle: "Build easy, fast and maintainable test suites for the long run."
date:   2017-12-14 21:29:43 +0200
css_files: [global, post]
---
There are a lot of great [benefits from unit testing](https://github.com/Spectory/unit_tests_dev_meeting/blob/master/blog.md) .

The code base changes over time, and so is the test code.  
Some tests are written as part of the TDD methodology, some are added after to verify older code.

A good test suite is easy & fast to maintain, refactor and expand.

At this article, we'll go some common pattern that may help your test suites to become more robust.

### Not Unit Testing

The only thing worst than a bad test suite is no test suite at all.

### Clean Code

Keep general coding best practices, same as at the production code.  
Principles (such as [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), meaningful names, [low ABC score](https://en.wikipedia.org/wiki/ABC_Software_Metric)...) should be followed.

### Testing Only The Golden Scenario

The golden scenario test proves that the function does what it should do, but **doesn't try hard enough to prove otherwise**.  
It doesn't take into account things like typing issues, invalid inputs, , logical thresholds an so on...
```javascript
const divide = (x, y) => x / y;

describe('divide', () => {
  it('should divide first number by the second', () => {
    expect(divide(1,2)).toEqual(0.5);
  })
});
```

Basically, we expect `divide` to behave like `(number, number) => number`. But that isn't the case:

```javascript
divide(1,0)
=> Infinity
divide(0,null)
=> NaN
divide('1',5)
=> 0.2
```

A more robust test suite will include edge cases
```javascript
describe('divide', () => {
  describe('when input is valid', () => {
    describe('when divider is zero', () => {
      ...
    })

    describe('when divider is not zero', () => {
      ...
    })
  });

  describe('when input is not valid', () => {
    ...
  });
});
```

Note that both test suites provide 100% test coverage. The second one provide a better line hits.

### Partial Code Coverage

Test coverage issues can be found easily by reviewing the code coverage reports.
```javascript
const func = (obj) => {
  if (obj.hasValue) {
    // do something
  }
  // do more stuff
  return 'done'
}

describe('func', () => {
  it('does something', () => {
    const obj = {}
    expect(func(obj)).toEqual('done');
  });
});
```

The test doesn't cover all logical branches of the function, in this case the `do something` block.

### Multiple setups

Multiple setups in a single tests case makes it hard to understand which input caused the test to fail,
making the test harder to maintain.
```javascript
describe('foo', () => {
  it('does something', () => {
    let obj = {}
    expect(foo(obj)).toEqual(...);
    obj = {value: 1}
    expect(foo(obj)).toEqual(...);
    obj = {value: 2}
    expect(foo(obj)).toEqual(...);
    obj = {value: 3}
  });
});
```

Its better to break it down:
```javascript
describe('foo', () => {
  describe('when value is a number', () => {
    it('does something when value is 1', () => {
      const obj = {value: 1}
      expect(foo(obj)).toEqual(...);
    });
    
    it('does something when value is 2', () => {
      const obj = {value: 2}
      expect(foo(obj)).toEqual(...);
    });
    
    it('does something when value is 3', () => {
      const obj = {value: 3}
      expect(foo(obj)).toEqual(...);
    });
  });
});
```

### Tests with Side Effects

Tests should have no impact on one another. The number/order of tests runs should not matter.
```javascript
describe('inc', () => {
  let obj;
  it ('should init obj.num', () => {
    obj = {};
    inc(obj)
    expect(obj.num).toBe(0);
  });
  
  it ('should increment obj.num', () => {
    inc(obj)
    expect(obj.num).toBe(1);
  });
});
```

The second test will only pass if the first has run. This can be solved by:
```javascript
describe('inc', () => {
  let obj;
  beforeEach(() => {
    obj = {};
  })
  
  it ('should init obj.num', () => {
    inc(obj)
    expect(obj.num).toBe(0);
  });
  
  it ('should increment obj.num', () => {
    obj.num = 0
    inc(obj);
    expect(obj.num).toBe(1);
  });
});
```

### Large setups in a test

Placing a large setup procedures in a test  
1\. Distract the reader from test core.  
2\. Makes it harder to write future test on the same subject.
```javascript
describe('func', () => {
  it('shuold do something', () => {
    subject = new Something()
    /* 
    * 10 lines of setup code
    */
    expect(subject.run).toEqual(...)
  })
});
```

At some point, other developer will need to add logic to `Something` class.  
He doesn't want, nor have the time, to go over the whole setup procedure, it doesn't really matter for his task.  
So he copies it, breaking the DRY rule.
```javascript
describe('func', () => {
  it('should run', () => {
    subject = new Something()
    /* 
    * 10 lines of setup code
    */
    expect(subject.run()).toEqual(...)
  })
  
  it('should start', () => {
    subject = new Something()
    /* 
    * 10 lines of setup code
    */
    expect(subject.start()).toEqual(...)
  })
});
```

We can prevent that by making the original test cleaner
```javascript
describe('func', () => {
  const subject;
  beforeEach(() =>{
    subject = new Something()
    /* 
    * 10 lines of setup code
    */
  })
  
  it('should do something', () => {
    expect(subject.run()).toEqual(...)
  })
});
```

Or by moving the setup into a function
```javascript
describe('func', () => {
  const setup = (subject) => {
  /* 
  * 10 lines of setup code
  */
  }
  
  it('should do something', () => {
    const subject = new Something()
    setup(subject);
    expect(subject.run()).toEqual(...)
  })
});
```

### Testing Interactions Instead of State

This subject was covered in my [previous post](http://spectory.com/blog/Test%20Doubles%20For%20Dummies)