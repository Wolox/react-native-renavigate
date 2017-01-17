import { connect } from 'react-redux';

import RootScene from './RootScene';

const mapStateToProps = (store, props) => {
  if (!props.tabIndex && props.tabIndex !== 0) {
    throw new Error('prop "tabIndex" must be present in TabContainer');
  }
  const navState = store.navigation;
  return {
    activeRoute: navState[props.tabIndex] && navState[props.tabIndex].activeRoute,
    navigationMethod: navState[props.tabIndex] && navState[props.tabIndex].method
  };
};

export default connect(mapStateToProps)(RootScene);
