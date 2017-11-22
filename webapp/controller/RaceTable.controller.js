sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";
	return Controller.extend("KartingReportingApp.controller.RaceTable", {

		onInit: function () {
			this.dataModel = this.getView().setModel(new JSONModel("times.json"), "laps");
		}
		
	});
});