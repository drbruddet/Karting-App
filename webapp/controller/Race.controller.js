sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	'sap/ui/model/json/JSONModel'
], function (Controller, History, JSONModel) {
	"use strict";
	return Controller.extend("KartingReportingApp.controller.Race", {
		
		onInit: function () {
			this.getModel().refresh(true);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("race").attachPatternMatched(this.onObjectMatched, this);
			this.buildTileModel();
		},

		buildTileModel: function () {
/*			var data = {
				"TileCollection" : [{
					"number" : "1",
					"numberUnit" : "TeamWork Management",
					"title" : "Travel Reimbursement"
				}, {
					"number" : "2",
					"numberUnit" : "Pictet",
					"title" : "My Salary"
				}, {
					"number" : "3",
					"numberUnit" : "Kendra",
					"title" : "My Salary"
				}]
			};
			var oModel = new JSONModel(data);
			this.getView().setModel(oModel);*/
		},
		
		goToCompleteTimes: function () {
			// Complete Times screen
		},
		
		goToRaceTeamDetail: function () {
			// Detail Team Race screen
		},
		
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("races", {}, true);
			}
		},
		
		onObjectMatched: function (oEvent) {
			this.getView().bindElement({ path: "/" + oEvent.getParameter("arguments").racePath });
		},
		
		getModel: function(name) {
    		return this.getView().getModel(name) || this.getOwnerComponent().getModel(name);
		}
	});
});