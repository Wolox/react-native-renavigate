# API docs

## Table of contents

- [Components](#components)
  - [RootSceneContainer](#rootscenecontainer)
  - [TabsContainer](#tabscontainer)
- [Glossary](#glossary)
  - [Route instance](#route-instance)
  - [Route definition](#route-definitions)
  - [Tab definition](#tab-definitions)
- [Actions](#actions)

## Components
### RootSceneContainer

Navigator wrapper without tabs handling.

#### Props

| Prop | Required | Default | Type | Description |
| :----- | :-----: | :----- |  :----- | :----- |
| initialRoute | X | - | [Route](#route-instance) | The initial route to be mounted |
| routeDefs | X | - | [Route Definitions](#route-definitions) | An object with an entry for each route existing in your app |
| decorateRouteComponent |  | - | `func` | Function that allows customizing the scene to be mounted |
| defaultTransition |  | PushFromRight | [SceneConfigs](https://facebook.github.io/react-native/docs/navigator.html#configurescene) | Default transition to be used for every route change. This can be overridden in each route definition  |
| navigationBar |  | [Navigator.NavigationBar](/src/RootScene.js#L117) | `func` | Function that can be used to override or customize the navigation bar. Params: dispatch and [props](/src/RootScene.js#L74) |
| navigationBarStyle |  | activeRoute.navBarStyles | `func` | Function that returns styles to be applied to the navigationBar. Receives the active route as only argument |
| navigationStyles |  | - |  | Navigation styles to be applied to the navigation bar. Note this isn't the same as navigationBarStyle prop, check react native [NavigatorNavigationBar props](https://github.com/facebook/react-native/blob/master/Libraries/CustomComponents/Navigator/NavigatorNavigationBar.js#L74). |


### TabsContainer

Navigator wrapper with tabs handling.

#### Props

| Prop | Required | Default  | Type | Description |
| :----- | :-----: | :-----: | :----- | :----- |
| tabs | X | - | [Tab Definition](#tab-definitions) | An array of tab definitions. The order of the objects in this array will be the order of the tabs in the app. |
| routeDefs | X | - | [Route Definitions](#route-definitions) | An object with an entry for each route existing in your app |
| initialTab |  | 0 | integer | The index of the initial active tab |
| tabsComponentProps |  |  | [scrollable-tab-view props](https://github.com/skv-headless/react-native-scrollable-tab-view#props) | Props to handle to the tabs component |
| decorateRouteComponent |  | - | `func` | Function that allows customizing the scene to be mounted |
| defaultTransition |  | PushFromRight | [SceneConfigs](https://facebook.github.io/react-native/docs/navigator.html#configurescene) | Default transition to be used for every route change. This can be overridden in each route definition  |
| navigationBar |  | [Navigator.NavigationBar](/src/RootScene.js#L117) | `func` | Function that can be used to override or customize the navigation bar. Params: dispatch and [props](/src/RootScene.js#L74) |
| navigationBarStyle |  | activeRoute.navBarStyles | `func` | Function that returns styles to be applied to the navigationBar. Receives the active route as only argument |
| navigationStyles |  | - |  | Navigation styles to be applied to the navigation bar. Note this isn't the same as navigationBarStyle prop, check react native [NavigatorNavigationBar props](https://github.com/facebook/react-native/blob/master/Libraries/CustomComponents/Navigator/NavigatorNavigationBar.js#L74). |


## Glossary

### Route instance

| Field | Required | Type | Description |
| :----- | :-----: | :----- | :----- |
| component | X | React Component | Component to be mounted when the route is active |
| params |  | Object | Object that will be handled to the route component as prop |
| leftButton |  | `func` | Function that returns a React component to be used as the left button of the navigation bar. `Dispatch` is used as first and only param. Only has effect if the default navigation bar is used |
| title |  | `func` | Function that returns a React component to be used as the main title of the navigation bar. `Dispatch` is used as first and only param. Only has effect if the default navigation bar is used |
| rightButton |  | `func` | Function that returns a React component to be used as the right button of the navigation bar. `Dispatch` is used as first and only param. Only has effect if the default navigation bar is used |
| navBarStyles |  | Object | Styles to be applied to the navigation bar when the route is active. Only has effect if the default navigation bar is used |


### Route definitions

A route definition is a function that receives the route params as argument and returns a [route instance](#route-instance). i.e:

```js
const routeDefs = {
  POSTS_LIST: (posts) => {
    component: PostsListContainer,
    params: { posts }
  },
  POST_DETAIL: (postId) => {
    component: PostDetailContainer,
    params: { postId }
  }
};
```

Then, PostListContainer will receive a prop called **posts** and PostDetailContainer will receive a prop called **postId**.

This params can be specified when instancing the initial route:

```js
import { RootSceneContainer } from 'react-native-renavigate';

const posts = [{ id: 1, title: 'foo', content: 'foo foo foo foo' }, { id: 2, title: 'bar', content: 'bar bar bar bar' }];

function main() {
  return <RootSceneContainer routeDefs={routeDefs} initialRoute={routeDefs.POSTS_LIST(posts)}
}
```

or can also be specified when creating route transitions:

```js
import { actionCreators as navigationActions } from 'react-native-renavigate';

function goToPostDetailButton({ postId, dispatch }) {
  const handleTransition = () => {
    dispatch(navigationActions.push.POST_DETAIL(postId));
  }
  return <TouchableOpacity onPress={handleTransition}><Text> Go to detail </Text></TouchableOpacity>;
}
```

### Tab definitions

A tab definition is an object that specifies, at least, the initialRoute of each tab in your app.
If you use the default TabBar you must also specify a label attribute per tab.

e.g:

```js
import { TabsContainer } from 'react-native-renavigate';
import routeDefs from './routes';

const TABS = [
  {
    label: 'Posts',
    initialRoute: routeDefs.LIST({ posts })
  },
  {
    label: 'Profile',
    initialRoute: routeDefs.PROFILE()
  },
  {
    label: 'Settings',
    initialRoute: routeDefs.SETTINGS()
  }
];

function app() {
  return (
    <TabsContainer
      tabs={TABS}
      routeDefs={routeDefs}
      initialTab={1}
      tabsComponentProps={{ tabBarPosition: 'bottom' }}
    />
  );
}
```

## Actions

`renavigate` transforms the NavigatorAPI to redux actions and those actions are exposed as `actionCreators` in the `react-native-renavigate` package.

```js
import { actionCreators } from 'react-native-renavigate';
```

You can dispatch the following actions to trigger transitions:
- actionCreators.push.**route_name**(**params**)
- actionCreators.resetTo.**route_name**(**params**)
- actionCreators.replace.**route_name**(**params**)
- actionCreators.pop()
- actionCreators.popToTop()
