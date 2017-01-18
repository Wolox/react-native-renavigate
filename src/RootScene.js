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
    initActions(props.routeDefs); // TODO: esto va a pisar el resto? no permitir rutas con el mismo nombre!
  }

  getChildContext() {
    return { activeRouteInstance: this.getCurrentRoute() || this.props.initialRoute };
  }

  componentWillReceiveProps({ activeRoute, navigationMethod }) {
    if (this.props.activeRoute !== activeRoute) {
      const navigator = this.getNavigator();
      if (navigationMethod === actions.POP || navigationMethod === actions.POP_TO_TOP) {
        navigator[navigationMethod]();
      } else if (navigationMethod === actions.PUSH || navigationMethod === actions.RESET_TO) {
        navigator[navigationMethod](this.props.routeDefs[activeRoute.name](activeRoute.params));
      }
    }
  }

  getNavigator() {
    return this.refs[RootScene.refs.navigatorComponent];
  }

  getCurrentRoute() {
    const navigator = this.getNavigator();
    if (!navigator || !navigator.navigationContext) {
      return null;
    }
    return navigator.navigationContext.currentRoute;
  }

  renderScene = (route) => {
    return this.props.decorateRouteComponent(route.component, route.params, route);
  }

  configureScene = (route) => {
    return route.transition || this.props.defaultTransition;
  }

  render() {
    return (
      <Navigator
        ref={RootScene.refs.navigatorComponent}
        initialRoute={this.props.initialRoute}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
        navigationBar={this.props.navigationBar(this.props.dispatch)}
      />
    );
  }
}

const routeInstancePropType = React.PropTypes.shape({
  component: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.element
  ]),
  params: React.PropTypes.object
});

RootScene.propTypes = {
  activeRoute: navigationPropTypes.activeRoute, // from store
  decorateRouteComponent: React.PropTypes.func.isRequired,
  defaultTransition: React.PropTypes.any.isRequired,
  initialRoute: routeInstancePropType,
  navigationBar: React.PropTypes.func.isRequired,
  navigationMethod: navigationPropTypes.method, // from store
  routeDefs: React.PropTypes.objectOf(React.PropTypes.func.isRequired).isRequired
};

RootScene.defaultProps = {
  decorateRouteComponent: (RouteComponent, params) => <RouteComponent {...params} />,
  defaultTransition: Navigator.SceneConfigs.PushFromRight,
  navigationBar: (dispatch) => {
    return <Navigator.NavigationBar routeMapper={navigationBarRouteMapper(dispatch)} />;
  }
};

RootScene.childContextTypes = {
  activeRouteInstance: routeInstancePropType.isRequired
};
