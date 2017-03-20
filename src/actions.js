
export const actions = {
  PUSH: '@@renavigate/PUSH',
  SOFT_POP: '@@renavigate/SOFT_POP',
  POP: '@@renavigate/POP',
  POP_TO_TOP: '@@renavigate/POP_TO_TOP',
  RESET_TO: '@@renavigate/RESET_TO',
  REPLACE: '@@renavigate/REPLACE',
  TAB_CHANGED: '@@renavigate/TAB_CHANGED',
  INIT_TABS: '@@renavigate/INIT_TABS'
};

export const actionCreators = {
  push: {},
  resetTo: {},
  replace: {},
  softPop: () => ({ type: actions.SOFT_POP }),
  pop: () => ({ type: actions.POP }),
  popToTop: () => ({ type: actions.POP_TO_TOP }),
  tabChanged: (tabIndex) => ({ type: actions.TAB_CHANGED, payload: { tabIndex } }),
  initTabs: (tabsCount, initialTab) => ({ type: actions.INIT_TABS, payload: { tabsCount, initialTab } })
};

export function initActions(routeDefs) {

  const routePayload = (name, params) => ({ route: { name, params } });

  const routeNames = Object.keys(routeDefs);
  for (const routeName of routeNames) {
    actionCreators.push[routeName] = (params) => {
      return {
        type: actions.PUSH,
        payload: routePayload(routeName, params)
      };
    };
    actionCreators.resetTo[routeName] = (params) => {
      return {
        type: actions.RESET_TO,
        payload: routePayload(routeName, params)
      };
    };
    actionCreators.replace[routeName] = (params) => {
      return {
        type: actions.REPLACE,
        payload: routePayload(routeName, params)
      };
    };
  }
}
