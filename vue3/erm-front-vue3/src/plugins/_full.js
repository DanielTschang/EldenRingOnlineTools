 /* eslint-disable */ 
var rbush = require("rbush");
var factory = require("./leafletplugins");

window.L.CanvasIconLayer = factory(L);
window.rbush = rbush;