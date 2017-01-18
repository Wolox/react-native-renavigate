import React from 'react';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

// ver como inicializar activeTabIndex
const defaultState = Immutable({
  activeTabIndex: null,
  [null]: {
    routeStack: [],
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
          routeStack: [...tabState.routeStack, tabState.activeRoute],
          activeRoute: payload.route,
          method: type
        }
      });
    }
    case actions.RESET_TO: {
      return state.merge({
        [state.activeTabIndex]: {
          routeStack: [],
          activeRoute: payload.route,
          method: type
        }
      });
    }
    case actions.POP: {
      const tabState = state[state.activeTabIndex];
      return state.merge({
        [state.activeTabIndex]: {
          routeStack: tabState.routeStack.slice(0, -2),
          activeRoute: tabState.routeStack.length > 0 ? tabState.routeStack.slice(-1)[0] : tabState.activeRoute,
          method: type
        }
      });
    }
    case actions.POP_TO_TOP: {
      const tabState = state[state.activeTabIndex];
      return state.merge({
        [state.activeTabIndex]: {
          routeStack: [],
          activeRoute: tabState.routeStack.length > 0 ? tabState.routeStack[0] : tabState.activeRoute,
          method: type
        }
      });
    }
    case actions.INIT_TABS: {
      if (Number.isInteger(state.activeTabIndex)) {
        // in android. the init_tabs action is fired whenever the app restores from the background but we
        // only want to handle the first dispatch of this action.
        return state;
      }
      const tabsState = {};
      for (let tabIndex = 0; tabIndex < payload.tabsCount; tabIndex++) {
        tabsState[tabIndex] = {
          routeStack: [],
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
  routeStack: React.PropTypes.arrayOf(routePropType).isRequired,
  method: React.PropTypes.string,
  activeTabIndex(props, propName) {
    const value = props[propName];
    return Number.isInteger(value) || value === null;
  }
};
