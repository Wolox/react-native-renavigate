Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='src/TabContainer.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactRedux=require('react-redux');
var _reactNative=require('react-native');
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);

var _RootScene=require('./RootScene');var _RootScene2=_interopRequireDefault(_RootScene);
var _actions=require('./actions');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

TabContainer=function(_Component){_inherits(TabContainer,_Component);function TabContainer(){var _ref;var _temp,_this,_ret;_classCallCheck(this,TabContainer);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=TabContainer.__proto__||Object.getPrototypeOf(TabContainer)).call.apply(_ref,[this].concat(args))),_this),_this.



























handleAndroidBackButton=function(){
if(_this.props.routeStack&&_this.props.routeStack.length){
_this.props.dispatch(_actions.actionCreators.pop());
return true;
}
},_this.

handleWillFocus=function(route){
if(_this.props.onWillFocus){
_this.props.onWillFocus(route,_this.props.tabIndex);
}
},_this.

handleDidFocus=function(route){
if(_this.props.onDidFocus){
_this.props.onDidFocus(route,_this.props.tabIndex);
}
},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(TabContainer,[{key:'componentDidMount',value:function componentDidMount(){if(this.props.isActiveTab){this.addAndroidBackButtonListener();}}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(nextProps){if(this.props.isActiveTab&&!nextProps.isActiveTab){this.removeAndroidBackButtonListener();}else if(!this.props.isActiveTab&&nextProps.isActiveTab){this.addAndroidBackButtonListener();}}},{key:'componentWillUnmount',value:function componentWillUnmount(){this.removeAndroidBackButtonListener();}},{key:'addAndroidBackButtonListener',value:function addAndroidBackButtonListener(){_reactNative.BackHandler.addEventListener('hardwareBackPress',this.handleAndroidBackButton);}},{key:'removeAndroidBackButtonListener',value:function removeAndroidBackButtonListener(){_reactNative.BackHandler.removeEventListener('hardwareBackPress',this.handleAndroidBackButton);}},{key:'render',value:function render()

{
return(
_react2.default.createElement(_RootScene2.default,_extends({},
this.props,{
onWillFocus:this.handleWillFocus,
onDidFocus:this.handleDidFocus,__source:{fileName:_jsxFileName,lineNumber:58}})));

}}]);return TabContainer;}(_react.Component);


TabContainer.propTypes=_extends({
isActiveTab:_propTypes2.default.bool},
_RootScene2.default.propTypes);


var mapStateToProps=function mapStateToProps(store,props){
if(!props.tabIndex&&props.tabIndex!==0){
throw new Error('prop "tabIndex" must be present in TabContainer');
}
var navState=store.navigation[props.tabIndex];
return{
activeRoute:navState&&navState.activeRoute,
navigationMethod:navState&&navState.method,
routeStack:navState&&navState.routeStack,
isActiveTab:store.navigation.activeTabIndex===props.tabIndex};

};exports.default=

(0,_reactRedux.connect)(mapStateToProps)(TabContainer);