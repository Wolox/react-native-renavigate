import React, { Component } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';

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
        onChangeTab={this.handleTabChanged}
        initialPage={this.initialTab}
        {...this.props.tabsComponentProps}
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
      />
    );
  }

  handleTabChanged = ({ i }) => {
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
  initialTab: React.PropTypes.number.isRequired,
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
