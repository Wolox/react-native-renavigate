import React, { Component } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';

import TabContainer from './TabContainer';
import { actionCreators } from './actions';

class TabsContainer extends Component {

  getTabsComponent(tabs) {
    return (
      <ScrollableTabView
        onChangeTab={this.handleTabChanged}
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


TabsContainer.propTypes = {
  routes: TabContainer.propTypes.routes,
  tabs: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      initialRoute: TabContainer.propTypes.initialRoute,
      label: React.PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  ...ScrollableTabView.propTypes
};

export default connect()(TabsContainer);
