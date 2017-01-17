import React from 'react';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

// ver como inicializar activeTabIndex
const defaultState = Immutable({
  activeTabIndex: null
});

export default function reducer(state = defaultState, { type, payload }) {
  switch (type) {
    case actions.PUSH: {
      return state.merge({
        [state.activeTabIndex]: {
          routes: [...state.routes, state.activeRoute],
          activeRoute: payload.route,
          method: type
        }
      });
    }
    case actions.RESET_TO: {
      return state.merge({
        [state.activeTabIndex]: {
          routes: [],
          activeRoute: payload.route,
          method: type
        }
      });
    }
    case actions.POP: {
      return state.merge({
        [state.activeTabIndex]: {
          routes: state.routes.slice(0, -2),
          activeRoute: state.routes.length > 0 ? state.routes.slice(-1)[0] : state.activeRoute,
          method: type
        }
      });
    }
    case actions.POP_TO_TOP: {
      return state.merge({
        [state.activeTabIndex]: {
          routes: [],
          activeRoute: state.routes.length > 0 ? state.routes[0] : state.activeRoute,
          method: type
        }
      });
    }
    case actions.TAB_CHANGED: {
      return state.merge({
        activeTabIndex: payload.tabIndex
      });
    }
    default: {
      return state;
    }
  }
}

const routePropType = React.PropTypes.shape({
  name: React.PropTypes.string.isRequired,
  params: React.PropTypes.object
});

export const propTypes = {
  activeRoute: routePropType,
  routes: React.PropTypes.objectOf(React.PropTypes.func.isRequired).isRequired, // este está mal acá. confunde. pasarlo derecho al rootscene
  method: React.PropTypes.string,
  activeTabIndex(props, propName) {
    const value = props[propName];
    return Number.isInteger(value) || value === null;
  }
};
