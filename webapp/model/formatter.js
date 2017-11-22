sap.ui.define([], function () {
	"use strict";
	return {
		getGap: function (gap) {
			return gap ? "+" + gap + "min" : "";
		},
		
		getIconRanking: function (ranking) {
			return ranking === "1" || ranking === "2" || ranking === "3" ? "sap-icon://competitor" : "";
		},
		
		getTeamTileBody: function(BestTime, AvgTime, Speed) {
			return "Best Time: " + BestTime + ". Avg Time: " + AvgTime + ". Speed: " + Speed + " Km/h";
		}
	};
});