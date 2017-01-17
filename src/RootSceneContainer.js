import React, { Component } from 'react';
import { Navigator } from 'react-native';
import { connect } from 'react-redux';

import { initActions, actions } from './actions';
import navigationBarRouteMapper from './navigationBarRouteMapper';

class RootSceneContainer extends Component {

  static refs = {
    navigatorComponent: 'navigatorComponent'
  }

  constructor(props) {
    super(props);
    initActions(props.routes); // TODO: esto va a pisar el resto? no permitir rutas con el mismo nombre!
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
        navigator[navigationMethod](this.props.routes[activeRoute.name](activeRoute.params));
      }
    }
  }

  getNavigator() {
    return this.refs[RootSceneContainer.refs.navigatorComponent];
  }

  getCurrentRoute() {
    const navigator = this.getNavigator();
    if (!navigator || !navigator.navigationContext) {
      return null;
    }
    return navigator.navigationContext.currentRoute;
  }

  renderScene = (route) => {
    const RouteComponent = route.component;
    return <RouteComponent {...route.params} />;
  }

  configureScene = (route) => {
    return route.transition || this.props.defaultTransition;
  }

  render() {
    return (
      <Navigator
        ref={RootSceneContainer.refs.navigatorComponent}
        initialRoute={this.props.initialRoute}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
        navigationBar={this.props.navigationBar(this.props.dispatch)}
      />
    );
  }
}

// TODO: be more specific. !important
RootSceneContainer.propTypes = {
  activeRoute: React.PropTypes.any,
  decorateRouteComponent: React.PropTypes.func.isRequired,
  defaultTransition: React.PropTypes.any.isRequired,
  initialRoute: React.PropTypes.any.isRequired,
  navigationBar: React.PropTypes.func.isRequired,
  routes: React.PropTypes.any.isRequired
};

RootSceneContainer.defaultProps = {
  decorateRouteComponent: (component) => component,
  defaultTransition: Navigator.SceneConfigs.PushFromRight,
  navigationBar: (dispatch) => {
    return <Navigator.NavigationBar routeMapper={navigationBarRouteMapper(dispatch)} />;
  }
};

RootSceneContainer.childContextTypes = {
  activeRouteInstance: React.PropTypes.any.isRequired
};

const mapStateToProps = (store) => {
  return {
    activeRoute: store.navigation.activeRoute,
    navigationMethod: store.navigation.method
  };
};

export default connect(mapStateToProps)(RootSceneContainer);
