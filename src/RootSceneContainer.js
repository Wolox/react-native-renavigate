import React, { Component } from 'react';
import { BackAndroid } from 'react-native';
import { connect } from 'react-redux';

import RootScene from './RootScene';
import { actionCreators as navigationActions } from './actions';
import { propTypes as navigationPropTypes } from './reducer';

class RootSceneContainer extends Component {

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleAndroidBackButton);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleAndroidBackButton);
  }

  handleAndroidBackButton() {
    if (this.props.routeStack && this.props.routeStack.length) {
      this.props.dispatch(navigationActions.pop());
      return true;
    }
  }

  render() {
    return (
      <RootScene {...this.props} />
    );
  }
}

RootSceneContainer.propTypes = {
  activeRoute: navigationPropTypes.activeRoute,
  navigationMethod: navigationPropTypes.method,
  routeStack: navigationPropTypes.routeStack
};

const mapStateToProps = (store) => {
  const navState = store.navigation[store.navigation.activeTabIndex];
  return {
    activeRoute: navState && navState.activeRoute,
    navigationMethod: navState && navState.method,
    routeStack: navState && navState.routeStack
  };
};

export default connect(mapStateToProps)(RootSceneContainer);
