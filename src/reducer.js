import React from 'react';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

const defaultState = Immutable({
  routes: [],
  activeRoute: null,
  method: null
});

export default function reducer(state = defaultState, { type, payload }) {
  switch (type) {
    case actions.PUSH: {
      return state.merge({
        routes: [...state.routes, state.activeRoute],
        activeRoute: payload.route,
        method: type
      });
    }
    case actions.RESET_TO: {
      return state.merge({
        routes: [],
        activeRoute: payload.route,
        method: type
      });
    }
    case actions.POP: {
      return state.merge({
        routes: state.routes.slice(0, -2),
        activeRoute: state.routes.length > 0 ? state.routes.slice(-1)[0] : state.activeRoute,
        method: type
      });
    }
    case actions.POP_TO_TOP: {
      return state.merge({
        routes: [],
        activeRoute: state.routes.length > 0 ? state.routes[0] : state.activeRoute,
        method: type
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
  routes: React.PropTypes.objectOf(React.PropTypes.func.isRequired).isRequired,
  method: React.PropTypes.string
};
