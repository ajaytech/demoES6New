/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"demoes6/demoES6New/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});