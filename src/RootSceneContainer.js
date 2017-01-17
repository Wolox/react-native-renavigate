import { connect } from 'react-redux';

import RootScene from './RootScene';

const mapStateToProps = (store) => {
  const navState = store.navigation;
  return {
    activeRoute: navState[navState.activeTabIndex].activeRoute,
    navigationMethod: navState[navState.activeTabIndex].method
  };
};

export default connect(mapStateToProps)(RootScene);
