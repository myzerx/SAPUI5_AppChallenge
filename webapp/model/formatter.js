sap.ui.define([
	"sap/ui/base/ManagedObject"
], function () {
	"use strict";

	return {
		deliveryText: function (oRequiredDate, oShippedDate) {
			var oResourceBundle = this.getModel("i18n").getResourceBundle();

			if (oShippedDate === null) {
				return "None";
			}

			if (oRequiredDate - oShippedDate > 0 && oRequiredDate - oShippedDate <= 432000000) {
				return oResourceBundle.getText("formatterDeliveryUrgent");
			} else if (oRequiredDate < oShippedDate) {
				return oResourceBundle.getText("formatterDeliveryTooLate");
			} else {
				return oResourceBundle.getText("formatterDeliveryInTime");
			}
		},

		deliveryState: function (oRequiredDate, oShippedDate) {
			if (oShippedDate === null) {
				return "None";
			}

			if (oRequiredDate - oShippedDate > 0 && oRequiredDate - oShippedDate <= 432000000) {
				return "Warning";
			} else if (oRequiredDate < oShippedDate) {
				return "Error";
			} else {
				return "Success";
			}
		}
	};
});