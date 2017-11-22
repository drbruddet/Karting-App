sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/viz/ui5/data/FlattenedDataset", 
	"sap/viz/ui5/controls/common/feeds/FeedItem"
], function (Controller, JSONModel, FlattenedDataset, FeedItem) {
	"use strict";
	return Controller.extend("KartingReportingApp.controller.RaceChart", {

		_constants: {
			sampleName: "KartingReportingApp",
			vizFrame: {
				id: "chartContainerVizFrame",
				dataset: {
					dimensions: [
						{ name: "Laps", value: "{LapId}" },
						{ name: "TeamName", value: "{TeamName}" }
					],
					measures: [ { group: 1, name: "Time", value: "{Time}" } ],
					data: { path: "/Laps" }
				},
				modulePath: "/times.json",
				type: "line",
				properties: { 
					plotArea: {
						isSmoothed: false, // lines or rounds
						lineVisible: true,
						showGap: true, 
						adjustScale: true, 
						drawingEffect: "normal", 
						gridline: { visible: true, type: "dash" },
						marker: { visible: true, shape: "circle" }
					},
					title: { visible: true, text: "Times by Teams and Laps", alignment: "center" },
					dataLabel: { visible: false, formatString: "#" }
				},
				feedItems: [
					{ "uid": "primaryValues", "type": "Measure", "values": ["Time"] }, 
					{ "uid": "axisLabels", "type": "Dimension", "values": ["Laps"] },
					{ "uid": "color", "type": "Dimension", "values": ["TeamName"] }
				]
			}
		},
		
		onInit: function () {
			var oVizFrame = this.getView().byId(this._constants.vizFrame.id);
			this._updateVizFrame(oVizFrame);
		},

		_updateVizFrame: function(vizFrame) {
			var oVizFrame		= this._constants.vizFrame;
			var oVizFramePath	= jQuery.sap.getModulePath(this._constants.sampleName, oVizFrame.modulePath);

			vizFrame.setVizProperties(oVizFrame.properties);
			vizFrame.setDataset(new FlattenedDataset(oVizFrame.dataset));
			vizFrame.setModel(new JSONModel(oVizFramePath));
			this._addFeedItems(vizFrame, oVizFrame.feedItems);
			vizFrame.setVizType(oVizFrame.type);
		},

		_addFeedItems: function(vizFrame, feedItems) {
			for (var i = 0; i < feedItems.length; i++) {
				vizFrame.addFeed(new FeedItem(feedItems[i]));
			}
		}
	});
});