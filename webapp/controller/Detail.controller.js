sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/m/library"
], function (BaseController, JSONModel, formatter, mobileLibrary) {
    "use strict"

    var URLHelper = mobileLibrary.URLHelper

    return BaseController.extend("sap.ui.demo.fiori2.controller.Detail", {

        formatter: formatter,

        onInit: function () {
            this._aValidKeys = ["shipping", "processor"]
            var oViewModel = new JSONModel({
                busy: false,
                delay: 0,
                lineItemListTitle: this.getResourceBundle().getText("detailLineItemTableHeading"),
                currency: "EUR",
                totalOrderAmount: 0,
            })

            this.getRouter().getRoute("detail").attachPatternMatched(this._onObjectMatched, this)

            this.setModel(oViewModel, "detailView")

            // this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this))
            console.log(this.getOwnerComponent().getModel())

        },

        _onObjectMatched: function (oEvent) {
            console.log(oEvent)
        },

        onTabSelect: function (oEvent) {
            var sSelectedTab = oEvent.getParameter("selectedKey")
            this.getRouter().navTo("object", {
                objectId: this._sObjetctId,
                query: {
                    tab: sSelectedTab
                }
            }, true)
        },

        toggleFullScreen: function () {
            new sap.f.semantic.FullScreenAction(Detail) // pensar em como atribuir a função fullscreen
        },

        onSendEmailPress: function () {
            var oViewModel = this.getModel("detailView")

            URLHelper.triggerEmail(
                null,
                oViewModel.getProperty("/shareSendEmailSubject"),
                oViewModel.getProperty("/shareSendEmailMessage")
            )
        },

        onCloseDetailPress: function () {
            var oFCL = this.oView.getParent().getParent();
            oFCL.setLayout(sap.f.LayoutType.OneColumn);
        },

        onHandleTelephonePress: function (oEvent) { // função na view processor
            var sNumber = oEvent.getSource().getText()
            URLHelper.triggerTel(sNumber)
        }
    })
})