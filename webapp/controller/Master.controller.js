sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox',
	'sap/f/library',
	'sap/ui/model/odata/v2/ODataModel'
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary, ODataModel) {
	"use strict"

	return Controller.extend("sap.ui.demo.fiori2.controller.Master", {
		onInit: function () {
			this.oView = this.getView()
			this._bDescendingSort = false
			this.oProductsTable = this.oView.byId("List")
			this.oRouter = this.getOwnerComponent().getRouter();




			var oModel = this.getOwnerComponent()

			this._oGroupFunctions = {
				OrderDate: function (oContext) {
					var oDate = oContext.getProperty("OrderDate"),
						iYear = oDate.getFullYear(),
						iMonth = oDate.getMonth() + 1,
						sMonthName = this._oMonthNameFormat.format(oDate);

					return {
						key: iYear + "-" + iMonth,
						text: this.getResourceBundle().getText("masterGroupTitleOrderedInPeriod", [sMonthName, iYear])
					};
				}.bind(this),

				ShippedDate: function (oContext) {
					var oDate = oContext.getProperty("ShippedDate");

					if (oDate != null) {
						var iYear = oDate.getFullYear(),
							iMonth = oDate.getMonth() + 1,
							sMonthName = this._oMonthNameFormat.format(oDate);

						return {
							key: iYear + "-" + iMonth,
							text: this.getResourceBundle().getText("masterGroupTitleShippedInPeriod", [sMonthName, iYear])
						};
					} else {
						return {
							key: 0,
							text: this.getResourceBundle().getText("masterGroupTitleNotShippedYet")
						};
					}
				}.bind(this)
			}

			var northwindODataModel = new ODataModel("/Northwind.svc")
			northwindODataModel.read("/Orders", {
				urlParameters: {
					$expand: "Customer"

				},
				success: (param) => {
					// changed getView to getOWnerComponent
					console.log(param)
					this.getOwnerComponent().setModel(new JSONModel({
						Orders: param.results
					}))
					this.getView().setModel(new JSONModel({
						titleCount: param.results.length
					}), 'masterView')
				},
				error: (error) => {
					console.log(error)
				}
			})

		},

		onListItemPress: function (oEvent) {
			// accessing the model and storing into a variable
			// this already turns into a global thing
			var ordersModel = this.getOwnerComponent().getModel();
			// storing the path from oModel right into the path for the order
			var sPath = oEvent.getParameter("listItem").getBindingContextPath(); // returns /Orders/190
			// returns the infos from the selected item
			var oData = ordersModel.getProperty(sPath);
			this.getOwnerComponent().setModel(new JSONModel(oData), "selectedItem")
			var oFCL = this.oView.getParent().getParent();
			oFCL.setLayout(sap.f.LayoutType.TwoColumnsMidExpanded);
		},

		onSelectionChange: function () {

		},

		onSearch: function () { // filtrar


		},

		OpenDialog: function () {

		},


		onUpdateFinished: function () {


		}

	})
});