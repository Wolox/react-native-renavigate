Object.defineProperty(exports,"__esModule",{value:true});exports.routeInstancePropType=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNativeDeprecatedCustomComponents=require('react-native-deprecated-custom-components');
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);

var _actions=require('./actions');
var _reducer=require('./reducer');
var _navigationBarRouteMapper=require('./navigationBarRouteMapper');var _navigationBarRouteMapper2=_interopRequireDefault(_navigationBarRouteMapper);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

RootScene=function(_Component){_inherits(RootScene,_Component);





function RootScene(props){_classCallCheck(this,RootScene);var _this=_possibleConstructorReturn(this,(RootScene.__proto__||Object.getPrototypeOf(RootScene)).call(this,
props));_this.


































































renderScene=function(route){
return _this.props.decorateRouteComponent(route.component,route.params,route);
};_this.

configureScene=function(route){
return route.transition||_this.props.defaultTransition;
};_this.

handleRouteChange=function(){
var navigator=_this.getNavigator();







if(
!_this.nonPopActionTriggered&&
navigator&&_this.routeStack&&navigator.state.routeStack.length===
_this.routeStack.length+1)
{
_this.routeStack=null;
_this.props.dispatch(_actions.actionCreators.softPop());
}

_this.nonPopActionTriggered=false;
};_this.

onWillFocus=function(route){
_this.handleRouteChange();
return _this.props.onWillFocus&&_this.props.onWillFocus(route);
};_this.

onDidFocus=function(route){
return _this.props.onDidFocus&&_this.props.onDidFocus(route);
};(0,_actions.initActions)(props.routeDefs);var initialRoutes=Array.isArray(_this.props.initialRoute)?_this.props.initialRoute:[_this.props.initialRoute];var currentRoute=initialRoutes[initialRoutes.length-1];var restoredRouteStack=_this.props.routeStack.asMutable().filter(function(route){return!!route;}).map(function(_ref){var name=_ref.name,params=_ref.params;return _this.props.routeDefs[name](params);});_this.initialRouteStack=restoredRouteStack.length?[initialRoutes[0]].concat(restoredRouteStack):initialRoutes;if(_this.props.activeRoute){var _this$props$activeRou=_this.props.activeRoute,restoredRouteName=_this$props$activeRou.name,restoredRouteParams=_this$props$activeRou.params;currentRoute=_this.props.routeDefs[restoredRouteName](restoredRouteParams);_this.initialRouteStack.push(currentRoute);}_this.state={currentRoute:currentRoute};return _this;}_createClass(RootScene,[{key:'getChildContext',value:function getChildContext(){return{activeRouteInstance:this.state.currentRoute};}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(_ref2){var activeRoute=_ref2.activeRoute,navigationMethod=_ref2.navigationMethod,routeStack=_ref2.routeStack;this.routeStack=routeStack;this.nonPopActionTriggered=navigationMethod===_actions.methodActions.REPLACE||navigationMethod===_actions.methodActions.PUSH;var navigator=this.getNavigator();if(this.props.activeRoute!==activeRoute){var currentRoute=activeRoute?this.props.routeDefs[activeRoute.name](activeRoute.params):this.props.initialRoute;this.setState({currentRoute:currentRoute});if(navigationMethod===_actions.methodActions.POP||navigationMethod===_actions.methodActions.POP_TO_TOP){navigator[navigationMethod]();}else if(navigationMethod===_actions.methodActions.PUSH||navigationMethod===_actions.methodActions.RESET_TO||navigationMethod===_actions.methodActions.REPLACE){navigator[navigationMethod](currentRoute);}}else if((navigationMethod===_actions.methodActions.POP||navigationMethod===_actions.methodActions.POP_TO_TOP)&&this.getNavigator()&&this.getNavigator().state.routeStack.length>1){navigator[navigationMethod]();}}},{key:'shouldComponentUpdate',value:function shouldComponentUpdate(nextProps){return nextProps.activeRoute!==this.props.activeRoute;}},{key:'getNavigator',value:function getNavigator(){return this.refs[RootScene.refs.navigatorComponent];}},{key:'render',value:function render()

{
var navigationBarProps={
navigationStyles:this.props.navigationStyles,
style:this.props.navigationBarStyle(this.state.currentRoute)};

return(
_react2.default.createElement(_reactNativeDeprecatedCustomComponents.Navigator,{
ref:RootScene.refs.navigatorComponent,
initialRouteStack:this.initialRouteStack,
onWillFocus:this.onWillFocus,
onDidFocus:this.onDidFocus,
renderScene:this.renderScene,
configureScene:this.configureScene,
navigationBar:this.props.navigationBar(this.props.dispatch,navigationBarProps)}));


}}]);return RootScene;}(_react.Component);RootScene.refs={navigatorComponent:'navigatorComponent'};exports.default=RootScene;


var routeInstancePropType=exports.routeInstancePropType=_propTypes2.default.shape({
component:_propTypes2.default.oneOfType([
_propTypes2.default.func,
_propTypes2.default.element]),

leftButton:_propTypes2.default.func,
params:_propTypes2.default.object,
rightButton:_propTypes2.default.func,
title:_propTypes2.default.func});


RootScene.propTypes={
activeRoute:_reducer.propTypes.activeRoute,
decorateRouteComponent:_propTypes2.default.func,
defaultTransition:_propTypes2.default.any,
initialRoute:_propTypes2.default.oneOfType([
routeInstancePropType,
_propTypes2.default.arrayOf(routeInstancePropType)]),

navigationBar:_propTypes2.default.func,
navigationBarStyle:_propTypes2.default.func,
navigationStyles:_reactNativeDeprecatedCustomComponents.Navigator.NavigationBar.propTypes.navigationStyles,
navigationMethod:_reducer.propTypes.method,
routeDefs:_propTypes2.default.objectOf(_propTypes2.default.func.isRequired).isRequired,
routeStack:_reducer.propTypes.routeStack,
onWillFocus:_propTypes2.default.func,
onDidFocus:_propTypes2.default.func,
onNavigationTriggered:_propTypes2.default.func};


RootScene.defaultProps={
decorateRouteComponent:function decorateRouteComponent(RouteComponent,params){return _react2.default.createElement(RouteComponent,params);},
defaultTransition:_reactNativeDeprecatedCustomComponents.Navigator.SceneConfigs.PushFromRight,
navigationBar:function navigationBar(dispatch,props){
return(
_react2.default.createElement(_reactNativeDeprecatedCustomComponents.Navigator.NavigationBar,_extends({
routeMapper:(0,_navigationBarRouteMapper2.default)(dispatch)},
props)));


},
navigationBarStyle:function navigationBarStyle(route){
return route&&route.navBarStyles;
}};


RootScene.childContextTypes={
activeRouteInstance:routeInstancePropType.isRequired};