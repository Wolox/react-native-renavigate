
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

export const methodActions = {
  PUSH: 'push',
  SOFT_POP: 'softPop',
  POP: 'pop',
  POP_TO_TOP: 'popToTop',
  RESET_TO: 'resetTo',
  REPLACE: 'replace',
  TAB_CHANGED: 'tabChanged',
  INIT_TABS: 'initTabs'
};

export const typeToMethod = {
  '@@renavigate/PUSH': 'push',
  '@@renavigate/SOFT_POP': 'softPop',
  '@@renavigate/POP': 'pop',
  '@@renavigate/POP_TO_TOP': 'popToTop',
  '@@renavigate/RESET_TO': 'resetTo',
  '@@renavigate/REPLACE': 'replace',
  '@@renavigate/TAB_CHANGED': 'tabChanged',
  '@@renavigate/INIT_TABS': 'initTabs'
};

export const actionCreators = {
  push: {},
  resetTo: {},
  replace: {},
  softPop: () => ({ type: actions.SOFT_POP }),
  pop: () => ({ type: actions.POP }),
  popToTop: () => ({ type: actions.POP_TO_TOP }),
  tabChanged: (tabIndex) => ({ type: actions.TAB_CHANGED, payload: { tabIndex } }),
  initTabs: (tabs, initialTab) => ({ type: actions.INIT_TABS, payload: { tabs, initialTab } })
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
