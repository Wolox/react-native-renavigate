
export const actions = {
  PUSH: 'push',
  POP: 'pop',
  POP_TO_TOP: 'popToTop',
  RESET_TO: 'resetTo'
};

export const actionCreators = {
  push: {},
  resetTo: {},
  pop: () => ({ type: actions.POP }),
  popToTop: () => ({ type: actions.POP_TO_TOP })
};

// TODO: recibir dispatch y usar bindActionsCreators
export function initActions(routes) {

  const routePayload = (name, params) => ({ route: { name, params } });

  const routeNames = Object.keys(routes);
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
  }
}
