# renavigate

#### React native navigation made easy using redux

[![CircleCI](https://circleci.com/gh/Wolox/react-native-renavigate.svg?style=svg)](https://circleci.com/gh/Wolox/react-native-renavigate)

`renavigate` works with [react redux](https://github.com/reactjs/react-redux/) on top of react native's [navigator component](https://facebook.github.io/react-native/docs/navigator.html) to allow an easy navigation management in your react native apps.

## Prerequisites
- redux
- react-redux

## Preface
If you are used to handling your routes with react native's default navigator and also like using redux, you will love renavigate. This library will keep your app's component structure simple and make your transitions much easier to accomplish transforming the [Navigator API](https://facebook.github.io/react-native/docs/navigator.html#methods) into redux actions.  
Last but not least, navigation related components like tab bar and navigation bar are easily pluggable and customizable.

## Docs & Help
- [Installation](#installation)
- [Getting started](#getting-started)
- [API](docs/API.md)
- Examples
  - [Running the examples](Examples)
  - [Basic Usage](Examples/BasicExample)
  - [Using tabs](Examples/TabsExample)
  - [Customizing TabBar](Examples/CustomTabBar)

## Installation

#### npm
```bash
npm install --save react-native-renavigate
```

#### yarn
```bash
yarn add react-native-renavigate
```


## Getting started

#### 1- Declare your routes

```js
const routeDefs = {
  POST_DETAIL: (post) => ({
    component: PostDetailContainer,
    params: {
      post
    }
  }),
  POSTS_LIST: (posts) => ({
    component: PostListContainer,
    params: {
      posts
    }
  })
};
```

Define each route in your app as a [function](docs/API.md#route-definitions) that returns a [plain object that will represent it](docs/API.md#route-instance).  
All your route definition functions must be contained in an object where each key is the route name (this name will be used with the redux actions later).

#### 2- Mount the root scene

```js
import { RootSceneContainer } from 'react-native-renavigate';

import store from './store';
import routeDefs from './routes';
import posts from './posts.json';

export default function index() {
  return (
    <Provider store={store}>
      <RootSceneContainer
        initialRoute={routeDefs.POSTS_LIST({ posts })}
        routeDefs={routeDefs}
      />
    </Provider>
  );
}
```

The [RootSceneContainer](docs/API.md#rootscenecontainer) component is our wrapper of react native Navigator, and will properly transform store changes into routes transitions. These store changes are triggered by renavigate actions, stay tunned!

###### * Using tabs
Our root component will need the [tab definitions](docs/API.md#tab-definitions) to properly handle them.

```js
const tabs = [
  {
    label: 'First tab',
    initialRoute: routeDefs.FIRST_TAB_INITIAL_ROUTE()
  },
  {
    label: 'Second tab',
    initialRoute: routeDefs.SECOND_TAB_INITIAL_ROUTE()
  },
  {
    label: 'Another tab',
    initialRoute: routeDefs.ANOTHER_TAB_INITIAL_ROUTE()
  }
];
```
Then, use them as prop of the root component. This time, we will use [TabsContainer](docs/API.md#tabscontainer):

```js
import { TabsContainer } from 'react-native-renavigate';

import store from './store';
import routeDefs from './routes';
import tabs from './tabs';

export default function index() {
  return (
    <Provider store={store}>
      <TabsContainer
        tabs={tabs}
        routeDefs={routeDefs}
      />
    </Provider>
  );
}
```

renavigate uses [react-native-scrollable-tab-view](https://github.com/skv-headless/react-native-scrollable-tab-view) out of the box to implement tabs.

#### 3- Give the navigation reducer to redux
Our root components will listen to store changes to trigger transitions, but first we need to add the renavigate reducer to the store.

```js
import { createStore, combineReducers } from 'redux'
import { reducer as renavigateReducer } from 'react-native-renavigate';

const reducers = {
  // ... your other reducers here ...
  navigation: renavigateReducer     // <---- Mounted at 'navigation'
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)
```

#### 4- Navigate!
As mentioned before, `renavigate` transforms the Navigator API to redux [actions](docs/API.md#actions) so you can dispatch the following actions to trigger transitions.

```js
import { actionCreators } from 'react-native-renavigate';

class MyComponent extends Component {

  handleTransition = (post) => {
    // Navigate forward to a new scene, squashing any scenes that you could jump forward to.
    this.props.dispatch(actionCreators.push.ROUTE_NAME());

    // Navigate to a new scene and reset route stack.
    // this.props.dispatch(actionCreators.resetTo.ROUTE_NAME());

    // Replace the current scene.
    // this.props.dispatch(actionCreators.replace.ROUTE_NAME());

    // Transition back and unmount the current scene.
    // this.props.dispatch(actionCreators.pop());

    // Pop to the first scene in the stack, unmounting every other scene.
    // this.props.dispatch(actionCreators.popToTop());
  }

  render() {
    return (
      <TouchableOpacity onPress={this.handleTransition}>
        <Text>Transition!</Text>
      </TouchableOpacity>
    );
  }
}
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## About

This project is maintained by [Sebastian Balay](https://github.com/sbalay) and it was written by [Wolox](http://www.wolox.com.ar).

![Wolox](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)

## License

**react-native-renavigation** is available under the MIT [license](LICENSE).

    Copyright (c) 2016 Sebastián Balay <sebastian.balay@wolox.com.ar>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
