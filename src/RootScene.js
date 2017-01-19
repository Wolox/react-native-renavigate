import React, { Component } from 'react';
import { Navigator } from 'react-native';

import { initActions, actions } from './actions';
import { propTypes as navigationPropTypes } from './reducer';
import navigationBarRouteMapper from './navigationBarRouteMapper';

export default class RootScene extends Component {

  static refs = {
    navigatorComponent: 'navigatorComponent'
  }

  constructor(props) {
    super(props);
    initActions(props.routeDefs);

    let currentRoute = this.props.initialRoute;

    const restoredRouteStack = this.props.routeStack
                                       .filter((route) => !!route)
                                       .map(({ name, params }) => this.props.routeDefs[name](params));

    this.initialRouteStack = [this.props.initialRoute].concat(restoredRouteStack);

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

  componentWillReceiveProps({ activeRoute, navigationMethod }) {

    if (this.props.activeRoute !== activeRoute) {
      const currentRoute = activeRoute
        ? this.props.routeDefs[activeRoute.name](activeRoute.params)
        : this.props.initialRoute;
      this.setState({ currentRoute });

      const navigator = this.getNavigator();
      if (navigationMethod === actions.POP || navigationMethod === actions.POP_TO_TOP) {
        navigator[navigationMethod]();
      } else if (navigationMethod === actions.PUSH || navigationMethod === actions.RESET_TO) {
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

  render() {
    const navigationBarProps = {
      navigationStyles: this.props.navigationStyles,
      style: this.props.navigationBarStyle(this.state.currentRoute)
    };
    return (
      <Navigator
        ref={RootScene.refs.navigatorComponent}
        initialRouteStack={this.initialRouteStack}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
        navigationBar={this.props.navigationBar(this.props.dispatch, navigationBarProps)}
      />
    );
  }
}

const routeInstancePropType = React.PropTypes.shape({
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
  activeRoute: navigationPropTypes.activeRoute, // from store
  decorateRouteComponent: React.PropTypes.func.isRequired,
  defaultTransition: React.PropTypes.any.isRequired,
  initialRoute: routeInstancePropType,
  navigationBar: React.PropTypes.func.isRequired,
  navigationBarStyle: React.PropTypes.func.isRequired,
  navigationStyles: Navigator.NavigationBar.propTypes.navigationStyles,
  navigationMethod: navigationPropTypes.method, // from store
  routeDefs: React.PropTypes.objectOf(React.PropTypes.func.isRequired).isRequired,
  routeStack: navigationPropTypes.routeStack
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
