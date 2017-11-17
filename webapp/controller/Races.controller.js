sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/Filter',
	'sap/ui/model/json/JSONModel'
	], function(jQuery, Controller, Filter, JSONModel) {
	"use strict";
	return Controller.extend("KartingReportingApp.controller.Races", {

		onInit: function() { 
			this.setNoDataText();
			
			var oViewModel = new JSONModel({
				RacesDatesArray: [
					{ "key" : ""    , "name" : "All" },
    				{ "key" : "2017", "name" : "2017" },
    				{ "key" : "2016", "name" : "2016" }
				],
				RacesIdArray: [
					{ "key" : ""   , "name" : "All" },
    				{ "key" : "001", "name" : "Trophee Andros" },
    				{ "key" : "002", "name" : "Coupe Univers" },
    				{ "key" : "003", "name" : "Etape Suisse" }
				],
				RacesTournamentArray: [
					{ "key" : ""   , "name" : "All" },
    				{ "key" : "002", "name" : "002" }
				],
				RacesLocationArray: [
					{ "key" : ""   , "name" : "All" },
    				{ "key" : "001", "name" : "001" },
    				{ "key" : "002", "name" : "002" },
    				{ "key" : "003", "name" : "003" }
				]
			});
			this.getView().setModel(oViewModel, "FilterModel");

			this.aKeys				= ["YearRace", "RaceId", "TournamentId", "LocationId"];
			this.oSelectYearRace	= this.getView().byId("race-year-filter");
			this.oSelectName		= this.getView().byId("race-name-filter");
			this.oSelectTournament	= this.getView().byId("race-tournament-filter");
			this.oSelectLocation	= this.getView().byId("race-location-filter");
		},
		
		onExit: function () {
			this.aKeys		= [];
			this.aFilters	= [];
			this.oModel 	= null;
		},

		goToRaceDetail: function() { 
			//go to the race detail page
		},
	
		formatToggleButtonText: function(bValue){
			var i18n = this.getModel("i18n").getResourceBundle();
			return bValue ? i18n.getText("collapseFilters") : i18n.getText("expandFilters");
		},

		onSelectChange: function() {
			var aCurrentFilterValues = [];
			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectYearRace));
			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectName));
			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectTournament));
			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectLocation));
			this.filterTable(aCurrentFilterValues);
		},

		filterTable: function (aCurrentFilterValues) {
			this.getView().byId("table_races").getBinding("items").filter(this.getFilters(aCurrentFilterValues));
		},

		getFilters: function (aCurrentFilterValues) {
			this.aFilters = [];

			this.aFilters = this.aKeys.map(function (sCriteria, i) {
				return new sap.ui.model.Filter(sCriteria, sap.ui.model.FilterOperator.Contains, aCurrentFilterValues[i]);
			});

			return this.aFilters;
		},
		
		getFilterCriteria: function (aCurrentFilterValues){
			return this.aKeys.filter(function (el, i) {
				if (aCurrentFilterValues[i] !== "") return  el;
			});
		},
		
		getSelectedItemText: function (oSelect) {
			return oSelect.getSelectedItem() ? oSelect.getSelectedItem().getKey() : "";
		},

		getModel: function(name) {
    		return this.getView().getModel(name) || this.getOwnerComponent().getModel(name);
		},
		
		setNoDataText: function() {
			var i18n	= this.getModel("i18n").getResourceBundle();
			var oModel	= this.getModel();
			var object	= this.byId("table_races");

			oModel.attachRequestFailed(function(){
				object.setNoDataText(i18n.getText("dataRequestFailed"));
			}).attachMetadataFailed(function(mArguments){
				var error = mArguments.getParameters();
				object.setNoDataText(error.statusCode + " " + error.statusText + ". " + error.response.body);
			}).attachRequestCompleted(function() {
				object.setNoDataText(
					this.bindList("$metadata").getLength() === 0 ? i18n.getText("noData") : i18n.getText("unknownError")
				);
			});
		}
		
	});
});