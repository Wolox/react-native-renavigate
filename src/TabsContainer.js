import React, { Component } from 'react';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { View } from 'react-native';

import TabContainer from './TabContainer';
import RootScene, { routeInstancePropType } from './RootScene';
import { actionCreators } from './actions';

class TabsContainer extends Component {

  constructor(props) {
    super(props);
    this.initialTab = props.activeTabIndex || props.initialTab;
    props.dispatch(actionCreators.initTabs(props.tabs.length, this.initialTab));
    this.activeRoutes = {};
    this.state = {
      hiddenPad: this.props.hiddenPad || 0
    };
  }

  shouldHideTabBar = () => {
    const currentTab = this.props.tabs[this.props.activeTabIndex];
    const activeRoute = this.activeRoutes[this.props.activeTabIndex];
    return (!this.props.alwaysShowTabBar && (this.props.shouldHideTabBar || (currentTab &&
      Array.isArray(currentTab.initialRoute) && currentTab.initialRoute.indexOf(activeRoute) > 0)));
  }

  afterPushView = () => {
    if (this.shouldHideTabBar()) {
      this.setState({ hiddenPad: 0 });
    }
  }

  beforePopView = (route, tabIndex) => {
    if (!this.shouldHideTabBar()) {
      this.setState({ hiddenPad: this.props.hiddenPad || 0 });
    }
    this.activeRoutes[tabIndex] = route;
    this.setState({ activeRoutes: this.activeRoutes });
  }

  renderTabBar = (props) => {
    if (this.shouldHideTabBar()) {
      return <View style={{ height: this.state.hiddenPad }}/>;
    }

    if (this.props.tabsComponentProps.renderTabBar) {
      return this.props.tabsComponentProps.renderTabBar(props);
    }

    return <DefaultTabBar {...props} />;
  }

  getTabsComponent(tabs) {
    return (
      <ScrollableTabView
        locked={this.shouldHideTabBar()}
        {...this.props.tabsComponentProps}
        onChangeTab={this.handleTabChanged}
        initialPage={this.initialTab}
        renderTabBar={this.renderTabBar}
        page={this.props.activeTabIndex}
      >
        {
          tabs.map((tab, index) => {
            return this.getTabComponent(tab, index);
          })
        }
      </ScrollableTabView>
    );
  }

  getTabComponent(tab, index) {
    return (
      <TabContainer
        key={tab.label}
        tabLabel={tab.label}
        tabIndex={index}
        initialRoute={tab.initialRoute}
        routeDefs={this.props.routeDefs}
        decorateRouteComponent={this.props.decorateRouteComponent}
        navigationBar={this.props.navigationBar}
        navigationBarStyle={this.props.navigationBarStyle}
        navigationStyles={this.props.navigationStyles}
        defaultTransition={this.props.defaultTransition}
        onWillFocus={this.beforePopView}
        onDidFocus={this.afterPushView}
      />
    );
  }

  handleTabChanged = ({ i }) => {
    if (this.props.tabsComponentProps.onChangeTab) {
      this.props.tabsComponentProps.onChangeTab({ i });
    }
    this.props.dispatch(actionCreators.tabChanged(i));
  }

  render() {
    return this.getTabsComponent(this.props.tabs);
  }
}

TabsContainer.defaultProps = {
  initialTab: 0,
  tabsComponentProps: {},
  alwaysShowTabBar: false
};

TabsContainer.propTypes = {
  activeTabIndex: React.PropTypes.number,
  initialTab: React.PropTypes.number.isRequired,
  tabs: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      initialRoute: React.PropTypes.oneOfType([
        routeInstancePropType,
        React.PropTypes.arrayOf(routeInstancePropType)
      ]),
      label: React.PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  tabsComponentProps: React.PropTypes.shape(ScrollableTabView.propTypes).isRequired,
  alwaysShowTabBar: React.PropTypes.bool,
  hiddenPad: React.PropTypes.number,
  ...RootScene.propTypes
};

const mapStateToProps = (store) => {
  const navState = store.navigation[store.navigation.activeTabIndex];
  return {
    activeRoute: navState && navState.activeRoute,
    activeTabIndex: store.navigation.activeTabIndex,
    shouldHideTabBar: store.navigation.shouldHideTabBar
  };
};

export default connect(mapStateToProps)(TabsContainer);
