sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"KartingReportingApp/model/formatter"
], function (Controller, History, JSONModel, formatter) {
	"use strict";
	return Controller.extend("KartingReportingApp.controller.Race", {
		formatter: formatter,
		
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("race").attachPatternMatched(this.onObjectMatched, this);
			this.setTeamTilesModel();
		},
		
		setTeamTilesModel: function() {
			var team = {
				"path" : [{
					"Ranking": "1",
					"TeamName": "Team Name",
					"BestTime": "01:02:12",
					"AvgTime": "01:03:23",
					"AvgSpeed": "55.1",
					"Gap": ""
				},{
					"Ranking": "2",
					"TeamName": "Team Name",
					"BestTime": "01:02:12",
					"AvgTime": "01:03:23",
					"AvgSpeed": "55.1",
					"Gap": "0.40"
				},{
					"Ranking": "3",
					"TeamName": "Team Name",
					"BestTime": "01:02:12",
					"AvgTime": "01:03:23",
					"AvgSpeed": "55.1",
					"Gap": "1.20"
				},{
					"Ranking": "4",
					"TeamName": "Team Name",
					"BestTime": "01:02:12",
					"AvgTime": "01:03:23",
					"AvgSpeed": "55.1",
					"Gap": "1.30"
				},{
					"Ranking": "5",
					"TeamName": "Team Name",
					"BestTime": "01:02:12",
					"AvgTime": "01:03:23",
					"AvgSpeed": "55.1",
					"Gap": "1.30"
				},{
					"Ranking": "6",
					"TeamName": "Team Name",
					"BestTime": "01:02:12",
					"AvgTime": "01:03:23",
					"AvgSpeed": "55.1",
					"Gap": "1.30"
				},{
					"Ranking": "7",
					"TeamName": "Team Name",
					"BestTime": "01:02:12",
					"AvgTime": "01:03:23",
					"AvgSpeed": "55.1",
					"Gap": "1.30"
				}]
			};
			this.getView().setModel(new JSONModel(team), "team");
		},

		goToTeamPilotDetails: function (oEvent) {
			//IL FAUT = TeamSet(RaceId='002',TeamId='02')/PilotSet
		/*	var teamId	= oEvent.getSource().getText();
			var raceId	= this.getView().getBindingContext().getPath().slice(10, 13); // RACE SET RaceSet('003');
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("team", { RaceId: raceId, TeamId: teamId }); */
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