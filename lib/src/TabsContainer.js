Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNativeScrollableTabView=require('react-native-scrollable-tab-view');var _reactNativeScrollableTabView2=_interopRequireDefault(_reactNativeScrollableTabView);
var _reactRedux=require('react-redux');
var _reactNative=require('react-native');
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);

var _TabContainer=require('./TabContainer');var _TabContainer2=_interopRequireDefault(_TabContainer);
var _RootScene=require('./RootScene');var _RootScene2=_interopRequireDefault(_RootScene);
var _actions=require('./actions');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

TabsContainer=function(_Component){_inherits(TabsContainer,_Component);

function TabsContainer(props){_classCallCheck(this,TabsContainer);var _this=_possibleConstructorReturn(this,(TabsContainer.__proto__||Object.getPrototypeOf(TabsContainer)).call(this,
props));_initialiseProps.call(_this);
_this.initialTab=props.activeTabIndex||props.initialTab;
props.dispatch(_actions.actionCreators.initTabs(props.tabs.length,_this.initialTab));
_this.activeRoutes={};
_this.state={
hiddenPad:_this.props.hiddenPad||0};return _this;

}_createClass(TabsContainer,[{key:'getTabsComponent',value:function getTabsComponent(


































tabs){var _this2=this;
return(
_react2.default.createElement(_reactNativeScrollableTabView2.default,_extends({
locked:this.shouldHideTabBar()},
this.props.tabsComponentProps,{
onChangeTab:this.handleTabChanged,
initialPage:this.initialTab,
renderTabBar:this.renderTabBar,
page:this.props.activeTabIndex}),


tabs.map(function(tab,index){
return _this2.getTabComponent(tab,index);
})));



}},{key:'getTabComponent',value:function getTabComponent(

tab,index){
return(
_react2.default.createElement(_TabContainer2.default,{
key:tab.label,
tabLabel:tab.label,
tabIndex:index,
initialRoute:tab.initialRoute,
routeDefs:this.props.routeDefs,
decorateRouteComponent:this.props.decorateRouteComponent,
navigationBar:this.props.navigationBar,
navigationBarStyle:this.props.navigationBarStyle,
navigationStyles:this.props.navigationStyles,
defaultTransition:this.props.defaultTransition,
onWillFocus:this.beforePopView,
onDidFocus:this.afterPushView}));


}},{key:'render',value:function render()








{
return this.getTabsComponent(this.props.tabs);
}}]);return TabsContainer;}(_react.Component);var _initialiseProps=function _initialiseProps(){var _this3=this;this.shouldHideTabBar=function(){var currentTab=_this3.props.tabs[_this3.props.activeTabIndex];var activeRoute=_this3.activeRoutes[_this3.props.activeTabIndex];return!_this3.props.alwaysShowTabBar&&(_this3.props.shouldHideTabBar||currentTab&&Array.isArray(currentTab.initialRoute)&&currentTab.initialRoute.indexOf(activeRoute)>0);};this.afterPushView=function(){if(_this3.shouldHideTabBar()){_this3.setState({hiddenPad:0});}};this.beforePopView=function(route,tabIndex){if(!_this3.shouldHideTabBar()){_this3.setState({hiddenPad:_this3.props.hiddenPad||0});}_this3.activeRoutes[tabIndex]=route;_this3.setState({activeRoutes:_this3.activeRoutes});};this.renderTabBar=function(props){if(_this3.shouldHideTabBar()){return _react2.default.createElement(_reactNative.View,{style:{height:_this3.state.hiddenPad}});}if(_this3.props.tabsComponentProps.renderTabBar){return _this3.props.tabsComponentProps.renderTabBar(props);}return _react2.default.createElement(_reactNativeScrollableTabView.DefaultTabBar,props);};this.handleTabChanged=function(_ref){var i=_ref.i;if(_this3.props.tabsComponentProps.onChangeTab){_this3.props.tabsComponentProps.onChangeTab({i:i});}_this3.props.dispatch(_actions.actionCreators.tabChanged(i));};};


TabsContainer.defaultProps={
initialTab:0,
tabsComponentProps:{},
alwaysShowTabBar:false};


TabsContainer.propTypes=_extends({
activeTabIndex:_propTypes2.default.number,
initialTab:_propTypes2.default.number.isRequired,
tabs:_propTypes2.default.arrayOf(
_propTypes2.default.shape({
initialRoute:_propTypes2.default.oneOfType([_RootScene.routeInstancePropType,

_propTypes2.default.arrayOf(_RootScene.routeInstancePropType)]),

label:_propTypes2.default.string.isRequired}).
isRequired).
isRequired,
tabsComponentProps:_propTypes2.default.shape(_reactNativeScrollableTabView2.default.propTypes).isRequired,
alwaysShowTabBar:_propTypes2.default.bool,
hiddenPad:_propTypes2.default.number},
_RootScene2.default.propTypes);


var mapStateToProps=function mapStateToProps(store){
var navState=store.navigation[store.navigation.activeTabIndex];
return{
activeRoute:navState&&navState.activeRoute,
activeTabIndex:store.navigation.activeTabIndex,
shouldHideTabBar:store.navigation.shouldHideTabBar};

};exports.default=

(0,_reactRedux.connect)(mapStateToProps)(TabsContainer);