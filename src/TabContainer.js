import { connect } from 'react-redux';

import RootScene from './RootScene';

const mapStateToProps = (store, props) => {
  const navState = store.navigation;
  return {
    activeRoute: navState[props.tabIndex].activeRoute,
    navigationMethod: navState[props.tabIndex].method
  };
};

export default connect(mapStateToProps)(RootScene);
