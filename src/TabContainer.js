import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BackAndroid } from 'react-native';

import RootScene from './RootScene';
import { actionCreators as navigationActions } from './actions';
import { propTypes as navigationPropTypes } from './reducer';

class TabContainer extends Component {

  componentDidMount() {
    if (this.props.isActiveTab) {
      this.addAndroidBackButtonListener();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isActiveTab && !nextProps.isActiveTab) {
      this.removeAndroidBackButtonListener();
    } else if (!this.props.isActiveTab && nextProps.isActiveTab) {
      this.addAndroidBackButtonListener();
    }
  }

  componentWillUnmount() {
    this.removeAndroidBackButtonListener();
  }

  addAndroidBackButtonListener() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleAndroidBackButton);
  }

  removeAndroidBackButtonListener() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleAndroidBackButton);
  }

  handleAndroidBackButton = () => {
    if (this.props.routeStack && this.props.routeStack.length) {
      this.props.dispatch(navigationActions.pop());
      return true;
    }
  }

  render() {
    return <RootScene {...this.props} />;
  }
}

TabContainer.propTypes = {
  activeRoute: navigationPropTypes.activeRoute,
  isActiveTab: React.PropTypes.bool,
  navigationMethod: navigationPropTypes.method,
  routeStack: navigationPropTypes.routeStack
};

const mapStateToProps = (store, props) => {
  if (!props.tabIndex && props.tabIndex !== 0) {
    throw new Error('prop "tabIndex" must be present in TabContainer');
  }
  const navState = store.navigation[props.tabIndex];
  return {
    activeRoute: navState && navState.activeRoute,
    navigationMethod: navState && navState.method,
    routeStack: navState && navState.routeStack,
    isActiveTab: store.navigation.activeTabIndex === props.tabIndex
  };
};

export default connect(mapStateToProps)(TabContainer);
