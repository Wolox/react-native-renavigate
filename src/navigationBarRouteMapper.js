
export default function buildNavigationBarRouteMapper(dispatch) {
  // arguments = (route, navigator, index, navState)
  return {
    LeftButton(route) {
      return route.leftButton ? route.leftButton(dispatch, ...arguments) : null;
    },
    RightButton(route) {
      return route.rightButton ? route.rightButton(dispatch, ...arguments) : null;
    },
    Title(route) {
      return route.title ? route.title(dispatch, ...arguments) : null;
    }
  };
}
