import React, { Component } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { Navigator } from 'react-native';

import TabContainer from './TabContainer';
import { actionCreators } from './actions';
import { propTypes as navigationPropTypes } from './reducer';

class TabsContainer extends Component {

  constructor(props) {
    super(props);
    this.initialTab = props.activeTabIndex || props.initialTab;
    props.dispatch(actionCreators.initTabs(props.tabs.length, this.initialTab));
  }

  getTabsComponent(tabs) {
    return (
      <ScrollableTabView
        {...this.props.tabsComponentProps}
        onChangeTab={this.handleTabChanged}
        initialPage={this.initialTab}
      >
        {
          tabs.map((tab, index) => {
            return this.getTabComponent(tab, index);
          }
        )}
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
  tabsComponentProps: {}
};

TabsContainer.propTypes = {
  activeTabIndex: React.PropTypes.number,
  defaultTransition: React.PropTypes.any,
  decorateRouteComponent: React.PropTypes.func,
  initialTab: React.PropTypes.number.isRequired,
  navigationBar: React.PropTypes.func,
  navigationBarStyle: React.PropTypes.func,
  navigationStyles: Navigator.NavigationBar.propTypes.navigationStyles,
  routeDefs: React.PropTypes.objectOf(React.PropTypes.func.isRequired).isRequired,
  tabs: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      initialRoute: navigationPropTypes.initialRoute,
      label: React.PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  tabsComponentProps: React.PropTypes.shape(ScrollableTabView.propTypes).isRequired
};

const mapStateToProps = (store) => {
  return {
    activeTabIndex: store.navigation.activeTabIndex
  };
};

export default connect(mapStateToProps)(TabsContainer);
