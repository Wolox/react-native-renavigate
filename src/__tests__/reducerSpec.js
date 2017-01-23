import reducer, { defaultState } from '../reducer';
import { actionCreators, initActions } from '../actions';

describe('#reducer', () => {
  beforeEach(() => {
    const routes = {
      ROUTE_A: {
        component: 'AComponent'
      },
      ROUTE_B: {
        component: 'BComponent'
      },
      ROUTE_C: {
        component: 'CComponent'
      }
    };
    initActions(routes);
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it ('should handle a push action', () => {
    const action = actionCreators.push.ROUTE_A({ routeParam: 4 });

    const routeStackBeforeAction = defaultState[defaultState.activeTabIndex].routeStack;
    const activeRouteBeforeAction = defaultState[defaultState.activeTabIndex].activeRoute;

    const expectedState = defaultState.merge({
      [defaultState.activeTabIndex]: {
        activeRoute: { name: 'ROUTE_A', params: { routeParam: 4 } },
        method: 'push',
        routeStack: routeStackBeforeAction.concat(activeRouteBeforeAction)
      }
    });
    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it ('pop actions with empty stacks should have no effect', () => {
    const action = actionCreators.pop();

    const routeStackBeforeAction = defaultState[defaultState.activeTabIndex].routeStack;
    const activeRouteBeforeAction = defaultState[defaultState.activeTabIndex].activeRoute;

    const expectedState = defaultState.merge({
      [defaultState.activeTabIndex]: {
        activeRoute: activeRouteBeforeAction,
        method: 'pop',
        routeStack: routeStackBeforeAction
      }
    });

    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it ('pop to top actions with empty stacks should have no effect', () => {
    const action = actionCreators.popToTop();

    const routeStackBeforeAction = defaultState[defaultState.activeTabIndex].routeStack;
    const activeRouteBeforeAction = defaultState[defaultState.activeTabIndex].activeRoute;

    const expectedState = defaultState.merge({
      [defaultState.activeTabIndex]: {
        activeRoute: activeRouteBeforeAction,
        method: 'popToTop',
        routeStack: routeStackBeforeAction
      }
    });

    expect(reducer(undefined, action)).toEqual(expectedState);
  });
});
