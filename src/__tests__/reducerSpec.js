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

  it('should return the initial state if called without navigation actions', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  describe('without tabs', () => {
    describe('with empty route stack', () => {
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

      it ('should handle a reset to action', () => {
        const action = actionCreators.resetTo.ROUTE_A({ routeParam: 1 });

        const expectedState = defaultState.merge({
          [defaultState.activeTabIndex]: {
            activeRoute: { name: 'ROUTE_A', params: { routeParam: 1 } },
            method: 'resetTo',
            routeStack: []
          }
        });
        expect(reducer(undefined, action)).toEqual(expectedState);
      });

      it ('pop actions should have no effect', () => {
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

      it ('pop to top actions should have no effect', () => {
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

    describe('with 1 route in the stack', () => {
      let initialSpecState;
      beforeEach(() => {
        const action = actionCreators.push.ROUTE_C({ routeParam: 14 });
        initialSpecState = reducer(undefined, action);
      });

      it ('should handle a push action', () => {
        const action = actionCreators.push.ROUTE_A({ routeParam: 4 });

        const routeStackBeforeAction = initialSpecState[initialSpecState.activeTabIndex].routeStack;
        const activeRouteBeforeAction = initialSpecState[initialSpecState.activeTabIndex].activeRoute;

        const expectedState = initialSpecState.merge({
          [initialSpecState.activeTabIndex]: {
            activeRoute: { name: 'ROUTE_A', params: { routeParam: 4 } },
            method: 'push',
            routeStack: routeStackBeforeAction.concat(activeRouteBeforeAction)
          }
        });
        expect(reducer(initialSpecState, action)).toEqual(expectedState);
      });

      it ('should handle a reset to action', () => {
        const action = actionCreators.resetTo.ROUTE_A({ routeParam: 1 });

        const expectedState = initialSpecState.merge({
          [initialSpecState.activeTabIndex]: {
            activeRoute: { name: 'ROUTE_A', params: { routeParam: 1 } },
            method: 'resetTo',
            routeStack: []
          }
        });

        expect(reducer(initialSpecState, action)).toEqual(expectedState);
      });

      it ('should handle a pop action', () => {
        const action = actionCreators.pop();

        const routeStackBeforeAction = initialSpecState[initialSpecState.activeTabIndex].routeStack;

        const expectedState = initialSpecState.merge({
          [initialSpecState.activeTabIndex]: {
            activeRoute: routeStackBeforeAction.slice(-1)[0],
            method: 'pop',
            routeStack: routeStackBeforeAction.slice(0, -1)
          }
        });

        expect(reducer(initialSpecState, action)).toEqual(expectedState);
      });

      it ('should handle a pop to top action', () => {
        const action = actionCreators.popToTop();

        const routeStackBeforeAction = initialSpecState[initialSpecState.activeTabIndex].routeStack;

        const expectedState = initialSpecState.merge({
          [initialSpecState.activeTabIndex]: {
            activeRoute: routeStackBeforeAction[0],
            method: 'popToTop',
            routeStack: []
          }
        });

        expect(reducer(initialSpecState, action)).toEqual(expectedState);
      });
    });

    describe('with multiple routes in the stack', () => {
      let initialSpecState;
      beforeEach(() => {
        const action1 = actionCreators.push.ROUTE_C({ routeParam: 14 });
        const action2 = actionCreators.push.ROUTE_B({ routeParam: 4 });
        const action3 = actionCreators.push.ROUTE_C({ routeParam: 111 });
        const action4 = actionCreators.push.ROUTE_C({ routeParam: 22 });
        const action5 = actionCreators.push.ROUTE_A({ routeParam: 1 });
        initialSpecState = reducer(undefined, action1);
        initialSpecState = reducer(initialSpecState, action2);
        initialSpecState = reducer(initialSpecState, action3);
        initialSpecState = reducer(initialSpecState, action4);
        initialSpecState = reducer(initialSpecState, action5);
      });

      it ('should handle a push action', () => {
        const action = actionCreators.push.ROUTE_A({ routeParam: 4 });

        const routeStackBeforeAction = initialSpecState[initialSpecState.activeTabIndex].routeStack;
        const activeRouteBeforeAction = initialSpecState[initialSpecState.activeTabIndex].activeRoute;

        const expectedState = initialSpecState.merge({
          [initialSpecState.activeTabIndex]: {
            activeRoute: { name: 'ROUTE_A', params: { routeParam: 4 } },
            method: 'push',
            routeStack: routeStackBeforeAction.concat(activeRouteBeforeAction)
          }
        });
        expect(reducer(initialSpecState, action)).toEqual(expectedState);
      });

      it ('should handle a reset to action', () => {
        const action = actionCreators.resetTo.ROUTE_A({ routeParam: 1 });

        const expectedState = initialSpecState.merge({
          [initialSpecState.activeTabIndex]: {
            activeRoute: { name: 'ROUTE_A', params: { routeParam: 1 } },
            method: 'resetTo',
            routeStack: []
          }
        });

        expect(reducer(initialSpecState, action)).toEqual(expectedState);
      });

      it ('should handle a pop action', () => {
        const action = actionCreators.pop();

        const routeStackBeforeAction = initialSpecState[initialSpecState.activeTabIndex].routeStack;

        const expectedState = initialSpecState.merge({
          [initialSpecState.activeTabIndex]: {
            activeRoute: routeStackBeforeAction.slice(-1)[0],
            method: 'pop',
            routeStack: routeStackBeforeAction.slice(0, -1)
          }
        });

        expect(reducer(initialSpecState, action)).toEqual(expectedState);
      });

      it ('should handle several pop actions', () => {
        const action = actionCreators.pop();

        const routeStackBeforeAction = initialSpecState[initialSpecState.activeTabIndex].routeStack;

        const expectedState = initialSpecState.merge({
          [initialSpecState.activeTabIndex]: {
            activeRoute: routeStackBeforeAction.slice(-4)[0],
            method: 'pop',
            routeStack: routeStackBeforeAction.slice(0, -4)
          }
        });

        let stateAfterPop = reducer(initialSpecState, action);
        stateAfterPop = reducer(stateAfterPop, action);
        stateAfterPop = reducer(stateAfterPop, action);

        expect(reducer(stateAfterPop, action)).toEqual(expectedState);
      });

      it ('should handle a pop to top action', () => {
        const action = actionCreators.popToTop();

        const routeStackBeforeAction = initialSpecState[initialSpecState.activeTabIndex].routeStack;

        const expectedState = initialSpecState.merge({
          [initialSpecState.activeTabIndex]: {
            activeRoute: routeStackBeforeAction[0],
            method: 'popToTop',
            routeStack: []
          }
        });

        expect(reducer(initialSpecState, action)).toEqual(expectedState);
      });
    });
  });

  describe('with tabs', () => {
    it ('should handle tab changed action', () => {
      const tabsCount = 3;
      const initialTab = 2;
      const initAction = actionCreators.initTabs(tabsCount, initialTab);
      const initialSpecState = reducer(undefined, initAction);

      const action = actionCreators.tabChanged(0);
      const expectedState = initialSpecState.merge({
        activeTabIndex: 0
      });
      expect(reducer(initialSpecState, action)).toEqual(expectedState);
    });

    it ('should handle init tabs action', () => {
      const tabsCount = 3;
      const initialTab = 2;
      const action = actionCreators.initTabs(tabsCount, initialTab);

      const expectedState = defaultState.merge({
        0: {
          routeStack: [],
          activeRoute: null,
          method: null
        },
        1: {
          routeStack: [],
          activeRoute: null,
          method: null
        },
        2: {
          routeStack: [],
          activeRoute: null,
          method: null
        },
        activeTabIndex: 2
      });

      expect(reducer(undefined, action)).toEqual(expectedState);
    });

    it ('init tabs action should have no effect if tabs are already initialized', () => {
      const tabsCount = 3;
      const initialTab = 2;
      const action = actionCreators.initTabs(tabsCount, initialTab);

      const initialSpecState = reducer(undefined, action);

      expect(reducer(initialSpecState, action)).toEqual(initialSpecState);
    });
  });
});
