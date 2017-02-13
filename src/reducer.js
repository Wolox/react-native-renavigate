import React from 'react';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

export const defaultState = Immutable({
  activeTabIndex: null,
  [null]: {
    routeStack: [],
    activeRoute: null,
    method: null
  },
  shouldHideTabBar: false
});

/* eslint-disable complexity */
export default function reducer(state = defaultState, { type, payload }) {
  switch (type) {
    case actions.PUSH: {
      const tabState = state[state.activeTabIndex];
      return state.merge({
        [state.activeTabIndex]: {
          routeStack: [...tabState.routeStack, tabState.activeRoute],
          activeRoute: payload.route,
          method: type
        },
        shouldHideTabBar: true
      });
    }
    case actions.RESET_TO: {
      return state.merge({
        [state.activeTabIndex]: {
          routeStack: [],
          activeRoute: payload.route,
          method: type
        },
        shouldHideTabBar: false
      });
    }
    case actions.REPLACE: {
      return state.merge({
        [state.activeTabIndex]: {
          ...state[state.activeTabIndex],
          activeRoute: payload.route,
          method: type
        }
      });
    }
    case actions.POP: {
      const tabState = state[state.activeTabIndex];
      const nextActiveRoute = tabState.routeStack.length > 0
        ? tabState.routeStack.slice(-1)[0]
        : tabState.activeRoute;
      return state.merge({
        [state.activeTabIndex]: {
          routeStack: tabState.routeStack.slice(0, -1),
          activeRoute: nextActiveRoute,
          method: type
        },
        shouldHideTabBar: tabState.routeStack.slice(0, -1).length > 0
      });
    }
    case actions.POP_TO_TOP: {
      const tabState = state[state.activeTabIndex];
      return state.merge({
        [state.activeTabIndex]: {
          routeStack: [],
          activeRoute: tabState.routeStack.length > 0 ? tabState.routeStack[0] : tabState.activeRoute,
          method: type
        },
        shouldHideTabBar: false
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
        activeTabIndex: payload.initialTab,
        shouldHideTabBar: false
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
/* eslint-enable complexity */

const routePropType = React.PropTypes.shape({
  name: React.PropTypes.string.isRequired,
  params: React.PropTypes.object
});

export const propTypes = {
  activeRoute: routePropType,
  routeStack: React.PropTypes.arrayOf(routePropType),
  method: React.PropTypes.string,
  activeTabIndex(props, propName) {
    const value = props[propName];
    return Number.isInteger(value) || value === null;
  }
};
