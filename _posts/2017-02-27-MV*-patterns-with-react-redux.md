---
layout: post
title:  "MV* Patterns With React Redux"
subtitle: "Reduce, Reuse, Recycle."
description:  "MV* Patterns With React Redux"
date:   2017-02-27 21:29:43 +0200
css_files: []
---
The main promise of react & React Native is code reuse.
But As Aaron Greenwald states in [this wix talk](https://www.youtube.com/watch?v=_ZHPeEqMwso), it not free.
When done right you can achieve a very high code reuse percentage between your IOS, Android and Web apps.

At this blog post, I'll suggest some guidelines that may help you catch bad code smell early on.

### What code can we share?

When written right, React components can be reused. we're not gonna focus on that aspect of code reuse.

Pure JS has nothing to do with React. Such code is known as **Isomorphic JavaScript**.

The more code we place outside of the components, the more of it we can reuse.

However 'outside of the components' is a pretty big place.
When the codebase is a messy, its hard to reuse. You can't reuse what you can't find.

In order to reuse code, our team must keep strict design patterns and architecture guidelines.
Those guidelines are nothing special, they are well known ages before React ever existed.
1. Separate your logic from the view
2. Separation of concerns
3. DRY code

### Separate your logic from the view

The rule of thumb we must always remember is the react is just the View layer in our MV* app.

Imagine you write your app with jQuery, you won't place the JS code inside your HTML file, right?
You'll place it in a js file like a nice web neat developer.
How about Angular, would you place your logic the templates? No, you'll use factories/services.

You never want to place your logic inside a View, this is just a bad MV* practice.
Ah, and if you're app is written that way, you probably don't unit test, so good luck with that.
It the sure path to huge debugging cycles and massive code refactoring.

Since react is just JS, its very tempting to place logic within a component, but its a total anti-pattern.

### Separation of concerns

When we need to compute something, its easier to split the computation into small functions, and then compose them into a bigger one.
When dealing with a react component you usually see 3 concerns it deals with
- linking to external logic/data
- inner state management
- rendering

So... there is a lot going on in our component as is. We should keep it as minimal as we can.

We can't do much about the rendering part except following React best practices described at [Thinking React](https://facebook.github.io/react/docs/thinking-in-react.html)

The other two we can minimize by following design pattern described next.

### Example

If you are familiar with redux you probably familiar with the following pattern
```javascript
class MyComponent extends React.Component {
  .
  .
  .
  doSomething = (user) => {
    this.setState({doingSomething: true})
    .
    . // run some validations
    .
    this.props.actions.doUserAction(user);
  }

  renderUser(user) {
    return (
      <ul>
        <li>{user.name}</li>
        <li>{user.email}</li>
        <button onClick={() => this.doSomething(user)}>Do Something</button>
      </ul>
    )
  }

  render() {
    return (
      <div>
        {this.prop.users.map(u => this.renderUser(u)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const users = state.users.filter((u) => u.active)
  return {
    users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(eventActions, dispatch),
  };
};

MyComponent.propTypes = {
  users: React.PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
```

Well this component does quite a few things:
- mapStateToProps - Prepares our users data for the view by filtering users from the global state.
- mapDispatchToProps - Gives us access redux action dispatching.
- doSomething - Component internal logic.

We can move at least some of those concerns out of the component.

### The Dispatcher pattern

`mapDispatchToProps` has nothing to do with our view layer. Its a way to link to Redux `dispatch` method.
More over, its just boiler-plate code. You'll find it at every component that needs access to `dispatch`.
We can DRY this piece of code by a simple placing it in a **dispatcher**
```javascript
//_dispatch_access.js
import store from '../store';

export const dispatch = action => store.dispatch(action);
```

```javascript
// user_dispatcher.js
import { bindActionCreators } from 'redux';

import { dispatch } from './_dispatch_access';
import * as actions from '../actions/users_actions';

const dispatcher = bindActionCreators(actions, dispatch);
export default dispatcher;
```

### The Presenter pattern

`mapStateToProps` derives the components data from external data (the global store).
We do a some manipulation in order to adjust the data to our view.
Those manipulations can be DRYed out by using **Presenter**, most commonly known as **selectors**. [Reselect](https://github.com/reactjs/reselect) is very popular optimization for this pattern.
```javascript
// _state_access.js
import store from '../store';
export const getState = () => store.getState();
```

```javascript
    // user_selector.js
import { getState } from './_state_access';

export const all = (state = getState()) => state.users;
export const active = (state) => all(state).filter(u => u.active);
```

You might ask your self why do we need the `_state_access` since we pass the state into as input to all our selector methods.
We'll we don't really need need it.
The only place it comes handy is when we wish to access our state outside of a component,
for example from a helper - but do note, its probably better to avoid such patterns unless absolutely necessary.

### Helpers pattern

`doSomethingToUser` does too many things - changing the state, dispatching an action and validations.
- The first we can't do much about.
- The second was minimized by the dispatcher pattern described above.
- Validations we can refactor into a **helper** module.

Helper is a collection of pure functions that derive/create data from its input.
```javascript
// user_helper.js
export const canDoSomethingTo = (user) => {
//do some validations and return true/false
}
```

Now we can write our original component in the following pattern
```javascript
import * as userDispatcher from '../dispatchers/user_dispatcher';
import * as userSelector from '../selectors/user_selector';
import * as userHelper from '../helpers/user_helper'
class MyComponent extends React.Component {
  .
  .
  .
  doSomething = (user) => {
    this.setState({doingSomething: true})
    if (userHelper.canDoSomethingTo(user)) {
      userDispatcher.doUserAction(user);
    }
  }

  renderUser(user) {
    return (
      <ul>
        <li>{user.name}</li>
        <li>{user.email}</li>
        <button onClick={() => this.doSomething(user)}>Do Something</button>
      </ul>
    )
  }

  render() {
    return (
      <div>
        {this.prop.users.map(u => this.renderUser(u)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: userSelector.active(state)
  };
};

MyComponent.propTypes = {
  users: React.PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(MyComponent);
```

### So, what did we gain?

Our code is mostly pure functions!

1.  Its easier to test. Pure functions comes straight from unit test heaven.
  - `Helpers` are a bunch of pure functions.
  - `Selectors` are pure just functions, that take the global state as input.
  - `Dispatchers` are pure and very minimal. As long we test `user_actions.js` there is no real reason to test them at all.
2.  Pure functions can be composed. In other words, they are **easier to reuse**.

### Code smell tips

1.  React files should have end with `.jsx`.
2.  Isomorphic JS should files should end with `.js`
3.  `jsx` files should be small, no more than 100 lines.
4.  structure your folders separation between `js` and `jsx`. For example
  *   core
      *   helpers
          *   user_helper.js
      *   selectors
          *   user_selector.js
      *   dispatchers
          *   user_dispatcher.js
  *   webapp
      *   pages
          *   home_page.jsx
      *   widgets
  *   Native
      *   pages
          *   home_page.jsx
      *   widgets

### Summary

We introduced 3 patterns that organize the Model layer in a React MV* app.

1.  Dispatchers - dispatches Redux actions
2.  Selectors - prepare & format data from our Redux store into our React components.
3.  Helpers - General purpose pure functions.