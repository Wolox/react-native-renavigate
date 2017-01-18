import React, { Component } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';

import TabContainer from './TabContainer';
import { actionCreators } from './actions';
import { propTypes as navigationPropTypes } from './reducer';

class TabsContainer extends Component {

  constructor(props) {
    super(props);
    props.dispatch(actionCreators.initTabs(props.tabs.length));
  }

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
        routes={this.props.routes}
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
  routes: navigationPropTypes.routes,
  tabs: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      initialRoute: navigationPropTypes.initialRoute,
      label: React.PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default connect()(TabsContainer);
