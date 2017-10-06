Object.defineProperty(exports,"__esModule",{value:true});exports.default=
buildNavigationBarRouteMapper;function buildNavigationBarRouteMapper(dispatch){

return{
LeftButton:function LeftButton(route){
return route.leftButton?route.leftButton.apply(route,[dispatch].concat(Array.prototype.slice.call(arguments))):null;
},
RightButton:function RightButton(route){
return route.rightButton?route.rightButton.apply(route,[dispatch].concat(Array.prototype.slice.call(arguments))):null;
},
Title:function Title(route){
return route.title?route.title.apply(route,[dispatch].concat(Array.prototype.slice.call(arguments))):null;
}};

}