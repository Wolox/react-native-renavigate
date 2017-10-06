Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='src/RootSceneContainer.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _reactRedux=require('react-redux');

var _RootScene=require('./RootScene');var _RootScene2=_interopRequireDefault(_RootScene);
var _actions=require('./actions');
var _reducer=require('./reducer');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

RootSceneContainer=function(_Component){_inherits(RootSceneContainer,_Component);function RootSceneContainer(){var _ref;var _temp,_this,_ret;_classCallCheck(this,RootSceneContainer);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=RootSceneContainer.__proto__||Object.getPrototypeOf(RootSceneContainer)).call.apply(_ref,[this].concat(args))),_this),_this.









handleAndroidBackButton=function(){
if(_this.props.routeStack&&_this.props.routeStack.length){
_this.props.dispatch(_actions.actionCreators.pop());
return true;
}
},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(RootSceneContainer,[{key:'componentDidMount',value:function componentDidMount(){_reactNative.BackHandler.addEventListener('hardwareBackPress',this.handleAndroidBackButton);}},{key:'componentWillUnmount',value:function componentWillUnmount(){_reactNative.BackHandler.removeEventListener('hardwareBackPress',this.handleAndroidBackButton);}},{key:'render',value:function render()

{
return(
_react2.default.createElement(_RootScene2.default,_extends({},this.props,{__source:{fileName:_jsxFileName,lineNumber:28}})));

}}]);return RootSceneContainer;}(_react.Component);


RootSceneContainer.propTypes={
activeRoute:_reducer.propTypes.activeRoute,
navigationMethod:_reducer.propTypes.method,
routeStack:_reducer.propTypes.routeStack};


var mapStateToProps=function mapStateToProps(store){
var navState=store.navigation.null;
return{
activeRoute:navState&&navState.activeRoute,
navigationMethod:navState&&navState.method,
routeStack:navState&&navState.routeStack};

};exports.default=

(0,_reactRedux.connect)(mapStateToProps)(RootSceneContainer);