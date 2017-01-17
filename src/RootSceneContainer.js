import { connect } from 'react-redux';

import RootScene from './RootScene';

const mapStateToProps = (store) => {
  return {
    activeRoute: store.navigation.activeRoute,
    navigationMethod: store.navigation.method
  };
};

export default connect(mapStateToProps)(RootScene);
