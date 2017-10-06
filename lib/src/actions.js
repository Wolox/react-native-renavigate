Object.defineProperty(exports,"__esModule",{value:true});exports.












































initActions=initActions;var actions=exports.actions={PUSH:'@@renavigate/PUSH',SOFT_POP:'@@renavigate/SOFT_POP',POP:'@@renavigate/POP',POP_TO_TOP:'@@renavigate/POP_TO_TOP',RESET_TO:'@@renavigate/RESET_TO',REPLACE:'@@renavigate/REPLACE',TAB_CHANGED:'@@renavigate/TAB_CHANGED',INIT_TABS:'@@renavigate/INIT_TABS'};var methodActions=exports.methodActions={PUSH:'push',SOFT_POP:'softPop',POP:'pop',POP_TO_TOP:'popToTop',RESET_TO:'resetTo',REPLACE:'replace',TAB_CHANGED:'tabChanged',INIT_TABS:'initTabs'};var typeToMethod=exports.typeToMethod={'@@renavigate/PUSH':'push','@@renavigate/SOFT_POP':'softPop','@@renavigate/POP':'pop','@@renavigate/POP_TO_TOP':'popToTop','@@renavigate/RESET_TO':'resetTo','@@renavigate/REPLACE':'replace','@@renavigate/TAB_CHANGED':'tabChanged','@@renavigate/INIT_TABS':'initTabs'};var actionCreators=exports.actionCreators={push:{},resetTo:{},replace:{},softPop:function softPop(){return{type:actions.SOFT_POP};},pop:function pop(){return{type:actions.POP};},popToTop:function popToTop(){return{type:actions.POP_TO_TOP};},tabChanged:function tabChanged(tabIndex){return{type:actions.TAB_CHANGED,payload:{tabIndex:tabIndex}};},initTabs:function initTabs(tabsCount,initialTab){return{type:actions.INIT_TABS,payload:{tabsCount:tabsCount,initialTab:initialTab}};}};function initActions(routeDefs){

var routePayload=function routePayload(name,params){return{route:{name:name,params:params}};};

var routeNames=Object.keys(routeDefs);var _loop=function _loop(
routeName){
actionCreators.push[routeName]=function(params){
return{
type:actions.PUSH,
payload:routePayload(routeName,params)};

};
actionCreators.resetTo[routeName]=function(params){
return{
type:actions.RESET_TO,
payload:routePayload(routeName,params)};

};
actionCreators.replace[routeName]=function(params){
return{
type:actions.REPLACE,
payload:routePayload(routeName,params)};

};};for(var _iterator=routeNames,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref;if(_isArray){if(_i>=_iterator.length)break;_ref=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref=_i.value;}var routeName=_ref;_loop(routeName);
}
}