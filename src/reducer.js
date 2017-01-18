import React from 'react';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

// ver como inicializar activeTabIndex
const defaultState = Immutable({
  activeTabIndex: null,
  [null]: {
    routes: [],
    activeRoute: null,
    method: null
  }
});

export default function reducer(state = defaultState, { type, payload }) {
  switch (type) {
    case actions.PUSH: {
      const tabState = state[state.activeTabIndex];
      return state.merge({
        [state.activeTabIndex]: {
          routes: [...tabState.routes, tabState.activeRoute],
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
      const tabState = state[state.activeTabIndex];
      return state.merge({
        [state.activeTabIndex]: {
          routes: tabState.routes.slice(0, -2),
          activeRoute: tabState.routes.length > 0 ? tabState.routes.slice(-1)[0] : tabState.activeRoute,
          method: type
        }
      });
    }
    case actions.POP_TO_TOP: {
      const tabState = state[state.activeTabIndex];
      return state.merge({
        [state.activeTabIndex]: {
          routes: [],
          activeRoute: tabState.routes.length > 0 ? tabState.routes[0] : tabState.activeRoute,
          method: type
        }
      });
    }
    case actions.INIT_TABS: {
      const tabsState = {};
      for (let tabIndex = 0; tabIndex < payload.tabsCount; tabIndex++) {
        tabsState[tabIndex] = {
          routes: [],
          activeRoute: null,
          method: null
        };
      }
      return state.merge({
        ...tabsState,
        activeTabIndex: payload.initialTab
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
