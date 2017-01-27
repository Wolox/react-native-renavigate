import { actions, actionCreators, initActions } from '../src/actions';

describe('#initActions', () => {
  beforeEach(() => {
    const routeDefs = {
      ROUTE_A: { component: 'RouteAComponent' },
      ROUTE_B: { component: 'RouteBComponent' }
    };
    initActions(routeDefs);
  });
  it('should add push action creators', () => {
    expect(actionCreators.push.ROUTE_B).not.toBeUndefined();
    expect(actionCreators.push.ROUTE_A).not.toBeUndefined();
    expect(actionCreators.push.ROUTE_C).toBeUndefined();
  });
  it('should add resetTo action creators', () => {
    expect(actionCreators.resetTo.ROUTE_A).not.toBeUndefined();
    expect(actionCreators.resetTo.ROUTE_B).not.toBeUndefined();
    expect(actionCreators.resetTo.ROUTE_C).toBeUndefined();
  });
  it('should add replace action creators', () => {
    expect(actionCreators.replace.ROUTE_A).not.toBeUndefined();
    expect(actionCreators.replace.ROUTE_B).not.toBeUndefined();
    expect(actionCreators.replace.ROUTE_C).toBeUndefined();
  });
});

describe('#actionCreators', () => {
  describe('push', () => {
    beforeEach(() => {
      initActions({ ROUTE: { component: 'RouteComponent' } });
    });
    it('should create a push action', () => {
      const expectedAction = {
        type: actions.PUSH,
        payload: {
          route: {
            name: 'ROUTE',
            params: {
              routeParam: 3
            }
          }
        }
      };
      expect(actionCreators.push.ROUTE({ routeParam: 3 })).toEqual(expectedAction);
    });
  });
  describe('resetTo', () => {
    beforeEach(() => {
      initActions({ ROUTE: { component: 'RouteComponent' } });
    });
    it('should create a resetTo action', () => {
      const expectedAction = {
        type: actions.RESET_TO,
        payload: {
          route: {
            name: 'ROUTE',
            params: { foo: 'bar' }
          }
        }
      };
      expect(actionCreators.resetTo.ROUTE({ foo: 'bar' })).toEqual(expectedAction);
    });
  });
  describe('replace', () => {
    beforeEach(() => {
      initActions({ ROUTE: { component: 'RouteComponent' } });
    });
    it('should create a replace action', () => {
      const expectedAction = {
        type: actions.REPLACE,
        payload: {
          route: {
            name: 'ROUTE',
            params: { foo: 'bar' }
          }
        }
      };
      expect(actionCreators.replace.ROUTE({ foo: 'bar' })).toEqual(expectedAction);
    });
  });
  describe('pop', () => {
    it('should create a pop action', () => {
      const expectedAction = {
        type: actions.POP
      };
      expect(actionCreators.pop()).toEqual(expectedAction);
    });
  });
  describe('popToTop', () => {
    it('should create a popToTop action', () => {
      const expectedAction = {
        type: actions.POP_TO_TOP
      };
      expect(actionCreators.popToTop()).toEqual(expectedAction);
    });
  });
  describe('tabChanged', () => {
    it('should create a tabChanged action', () => {
      const expectedAction = {
        type: actions.TAB_CHANGED,
        payload: { tabIndex: 5 }
      };
      expect(actionCreators.tabChanged(5)).toEqual(expectedAction);
    });
  });
  describe('initTabs', () => {
    it('should create a initTabs action', () => {
      const expectedAction = {
        type: actions.INIT_TABS,
        payload: { tabsCount: 3, initialTab: 0 }
      };
      expect(actionCreators.initTabs(3, 0)).toEqual(expectedAction);
    });
  });
});
