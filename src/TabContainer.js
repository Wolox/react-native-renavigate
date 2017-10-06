import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import PropTypes from 'prop-types';

import RootScene from './RootScene';
import { actionCreators as navigationActions } from './actions';

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
    BackHandler.addEventListener('hardwareBackPress', this.handleAndroidBackButton);
  }

  removeAndroidBackButtonListener() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleAndroidBackButton);
  }

  handleAndroidBackButton = () => {
    if (this.props.routeStack && this.props.routeStack.length) {
      this.props.dispatch(navigationActions.pop());
      return true;
    }
  }

  handleWillFocus = (route) => {
    if (this.props.onWillFocus) {
      this.props.onWillFocus(route, this.props.tabIndex);
    }
  }

  handleDidFocus = (route) => {
    if (this.props.onDidFocus) {
      this.props.onDidFocus(route, this.props.tabIndex);
    }
  }

  render() {
    return (
      <RootScene
        {...this.props}
        onWillFocus={this.handleWillFocus}
        onDidFocus={this.handleDidFocus}
      />);
  }
}

TabContainer.propTypes = {
  isActiveTab: PropTypes.bool,
  ...RootScene.propTypes
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
