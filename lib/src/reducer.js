Object.defineProperty(exports,"__esModule",{value:true});exports.propTypes=exports.defaultState=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _Immutable;exports.default=















reducer;var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);var _seamlessImmutable=require('seamless-immutable');var _seamlessImmutable2=_interopRequireDefault(_seamlessImmutable);var _actions=require('./actions');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var defaultState=exports.defaultState=(0,_seamlessImmutable2.default)((_Immutable={activeTabIndex:null},_defineProperty(_Immutable,null,{routeStack:[],activeRoute:null,method:null}),_defineProperty(_Immutable,'shouldHideTabBar',false),_Immutable));function reducer(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:defaultState;var _ref=arguments[1];var type=_ref.type,payload=_ref.payload;
switch(type){
case _actions.actions.PUSH:{var _state$merge;
var tabState=state[state.activeTabIndex];
return state.merge((_state$merge={},_defineProperty(_state$merge,
state.activeTabIndex,{
routeStack:[].concat(_toConsumableArray(tabState.routeStack),[tabState.activeRoute]),
activeRoute:payload.route,
method:_actions.typeToMethod[type]}),_defineProperty(_state$merge,'shouldHideTabBar',

true),_state$merge));

}
case _actions.actions.RESET_TO:{var _state$merge2;
return state.merge((_state$merge2={},_defineProperty(_state$merge2,
state.activeTabIndex,{
routeStack:[],
activeRoute:payload.route,
method:_actions.typeToMethod[type]}),_defineProperty(_state$merge2,'shouldHideTabBar',

false),_state$merge2));

}
case _actions.actions.REPLACE:{
return state.merge(_defineProperty({},
state.activeTabIndex,_extends({},
state[state.activeTabIndex],{
activeRoute:payload.route,
method:_actions.typeToMethod[type]})));


}
case _actions.actions.SOFT_POP:
case _actions.actions.POP:{var _state$merge4;
var _tabState=state[state.activeTabIndex];
var nextActiveRoute=_tabState.routeStack.length>0?
_tabState.routeStack.slice(-1)[0]:
_tabState.activeRoute;
return state.merge((_state$merge4={},_defineProperty(_state$merge4,
state.activeTabIndex,{
routeStack:_tabState.routeStack.slice(0,-1),
activeRoute:nextActiveRoute,
method:_actions.typeToMethod[type]}),_defineProperty(_state$merge4,'shouldHideTabBar',

_tabState.routeStack.slice(0,-1).length>0),_state$merge4));

}
case _actions.actions.POP_TO_TOP:{var _state$merge5;
var _tabState2=state[state.activeTabIndex];
return state.merge((_state$merge5={},_defineProperty(_state$merge5,
state.activeTabIndex,{
routeStack:[],
activeRoute:_tabState2.routeStack.length>0?_tabState2.routeStack[0]:_tabState2.activeRoute,
method:_actions.typeToMethod[type]}),_defineProperty(_state$merge5,'shouldHideTabBar',

false),_state$merge5));

}
case _actions.actions.INIT_TABS:{
if(Number.isInteger(state.activeTabIndex)){


return state;
}
var tabsState={};
for(var tabIndex=0;tabIndex<payload.tabsCount;tabIndex++){
tabsState[tabIndex]={
routeStack:[],
activeRoute:null,
method:null};

}
return state.merge(_extends({},
tabsState,{
activeTabIndex:payload.initialTab,
shouldHideTabBar:false}));

}
case _actions.actions.TAB_CHANGED:{
return state.merge({
activeTabIndex:payload.tabIndex});

}
default:{
return state;
}}

}


var routePropType=_propTypes2.default.shape({
name:_propTypes2.default.string.isRequired,
params:_propTypes2.default.object});


var propTypes=exports.propTypes={
activeRoute:routePropType,
routeStack:_propTypes2.default.arrayOf(routePropType),
method:_propTypes2.default.string,
activeTabIndex:function activeTabIndex(props,propName){
var value=props[propName];
return Number.isInteger(value)||value===null;
}};