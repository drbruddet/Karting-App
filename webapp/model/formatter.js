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
/*			var str = "<strong>toto</strong>";    
			var html = $.parseHTML(str);
			console.log(html);
			return html; */
			
			var i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			return ( i18n.getText("BestTime")	+ ": " + BestTime	+ ". " +
					 i18n.getText("AvgTime")	+ ": " + AvgTime	+ ". " +
					 i18n.getText("AvgSpeed")	+ ": " + Speed		+ " Km/h." );
		}
	};
});