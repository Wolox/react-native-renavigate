import React, { Component } from 'react';
import { Navigator } from 'react-native';

import { initActions, methodActions, actionCreators } from './actions';
import { propTypes as navigationPropTypes } from './reducer';
import navigationBarRouteMapper from './navigationBarRouteMapper';

export default class RootScene extends Component {

  static refs = {
    navigatorComponent: 'navigatorComponent'
  }

  constructor(props) {
    super(props);
    initActions(props.routeDefs);

    // initialRoute may be the initialRoute itself or a list of initial routes.
    const initialRoutes = Array.isArray(this.props.initialRoute)
      ? this.props.initialRoute
      : [this.props.initialRoute];

    let currentRoute = initialRoutes[initialRoutes.length - 1];

    const restoredRouteStack = this.props.routeStack.asMutable()
                                       .filter((route) => !!route)
                                       .map(({ name, params }) => this.props.routeDefs[name](params));

    this.initialRouteStack = restoredRouteStack.length
      ? [initialRoutes[0]].concat(restoredRouteStack)
      : initialRoutes;

    if (this.props.activeRoute) {
      const { name: restoredRouteName, params: restoredRouteParams } = this.props.activeRoute;
      currentRoute = this.props.routeDefs[restoredRouteName](restoredRouteParams);
      this.initialRouteStack.push(currentRoute);
    }

    this.state = { currentRoute };
  }

  getChildContext() {
    return { activeRouteInstance: this.state.currentRoute };
  }

  componentWillReceiveProps({ activeRoute, navigationMethod, routeStack }) {

    this.routeStack = routeStack;
    this.nonPopActionTriggered =
      navigationMethod === methodActions.REPLACE || navigationMethod === methodActions.PUSH;

    if (this.props.activeRoute !== activeRoute) {
      const currentRoute = activeRoute
        ? this.props.routeDefs[activeRoute.name](activeRoute.params)
        : this.props.initialRoute;
      this.setState({ currentRoute });

      const navigator = this.getNavigator();
      if (navigationMethod === methodActions.POP || navigationMethod === methodActions.POP_TO_TOP) {
        navigator[navigationMethod]();
      } else if (navigationMethod === methodActions.PUSH ||
                 navigationMethod === methodActions.RESET_TO ||
                 navigationMethod === methodActions.REPLACE) {
        navigator[navigationMethod](currentRoute);
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    // only update if active route changes
    return nextProps.activeRoute !== this.props.activeRoute;
  }

  getNavigator() {
    return this.refs[RootScene.refs.navigatorComponent];
  }

  renderScene = (route) => {
    return this.props.decorateRouteComponent(route.component, route.params, route);
  }

  configureScene = (route) => {
    return route.transition || this.props.defaultTransition;
  }

  handleRouteChange = () => {
    const navigator = this.getNavigator();
    /* Here, we need to whether handle common actions that are captured in the reducer,
    or to handle swipe-to-pop gesture, typical in iOS.
    On pop or push, stack diff can be either 0 or 2, respectively.
    In swipe-to-pop, this diff will be 1, since the action isn't being handled by reducer.
    Then, if this diff is 1, and the action is not a replace, we need to pop a route from
    our stack. */

    if (
      !this.nonPopActionTriggered &&
      navigator && this.routeStack && navigator.state.routeStack.length ===
      this.routeStack.length + 1
    ) {
      this.routeStack = null;
      this.props.dispatch(actionCreators.softPop());
    }

    this.nonPopActionTriggered = false;
  }

  onWillFocus = () => {
    this.handleRouteChange();
    return this.props.onWillFocus && this.props.onWillFocus();
  }

  onDidFocus = () => {
    return this.props.onDidFocus && this.props.onDidFocus();
  }

  render() {
    const navigationBarProps = {
      navigationStyles: this.props.navigationStyles,
      style: this.props.navigationBarStyle(this.state.currentRoute)
    };
    return (
      <Navigator
        ref={RootScene.refs.navigatorComponent}
        initialRouteStack={this.initialRouteStack}
        onWillFocus={this.onWillFocus}
        onDidFocus={this.onDidFocus}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
        navigationBar={this.props.navigationBar(this.props.dispatch, navigationBarProps)}
      />
    );
  }
}

export const routeInstancePropType = React.PropTypes.shape({
  component: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.element
  ]),
  leftButton: React.PropTypes.func,
  params: React.PropTypes.object,
  rightButton: React.PropTypes.func,
  title: React.PropTypes.func
});

RootScene.propTypes = {
  activeRoute: navigationPropTypes.activeRoute,
  decorateRouteComponent: React.PropTypes.func,
  defaultTransition: React.PropTypes.any,
  initialRoute: React.PropTypes.oneOf([
    routeInstancePropType,
    React.PropTypes.arrayOf(routeInstancePropType)
  ]),
  navigationBar: React.PropTypes.func,
  navigationBarStyle: React.PropTypes.func,
  navigationStyles: Navigator.NavigationBar.propTypes.navigationStyles,
  navigationMethod: navigationPropTypes.method,
  routeDefs: React.PropTypes.objectOf(React.PropTypes.func.isRequired).isRequired,
  routeStack: navigationPropTypes.routeStack,
  onWillFocus: React.PropTypes.func,
  onDidFocus: React.PropTypes.func
};

RootScene.defaultProps = {
  decorateRouteComponent: (RouteComponent, params) => <RouteComponent {...params} />,
  defaultTransition: Navigator.SceneConfigs.PushFromRight,
  navigationBar: (dispatch, props) => {
    return (
      <Navigator.NavigationBar
        routeMapper={navigationBarRouteMapper(dispatch)}
        {...props}
      />
    );
  },
  navigationBarStyle: (route) => {
    return route && route.navBarStyles;
  }
};

RootScene.childContextTypes = {
  activeRouteInstance: routeInstancePropType.isRequired
};
