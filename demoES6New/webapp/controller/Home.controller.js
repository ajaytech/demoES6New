sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("demoes6.demoES6New.controller.Home", {
		onInit: function () {
		
		var arr = [1, 2, 3, 4];

		var newArr = arr.map(a => a + 1);
		var arr = a => a - 1;
	
		}
	});
});