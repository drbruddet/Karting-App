sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";
	return Controller.extend("KartingReportingApp.controller.Race", {
		
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("race").attachPatternMatched(this.onObjectMatched, this);
		},

		onNavBack: function () {
			var oHistory		= History.getInstance();
			var sPreviousHash	= oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				sap.ui.core.UIComponent.getRouterFor(this).navTo("races", {}, true);
			}
		},
		
		onObjectMatched: function (oEvent) {
			this.getView().bindElement({ path: "/" + oEvent.getParameter("arguments").racePath });
		}
	});
});