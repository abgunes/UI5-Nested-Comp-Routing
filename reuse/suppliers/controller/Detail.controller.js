sap.ui.define(["yelcho/reuse/BaseController", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend("yelcho.reuse.suppliers.controller.Detail", {
		onInit: function() {
			Controller.prototype.onInit.apply(this, arguments)

			this.getOwnerComponent()
				.getRouter()
				.getRoute("detail")
				.attachPatternMatched(this._onPatternMatched, this)
		},
		_onPatternMatched: function(oEvent) {
			Controller.prototype.onInit.apply(this, arguments)

			const args = oEvent.getParameter("arguments")

			this.getOwnerComponent()
				.getModel()
				.metadataLoaded()
				.then(this._bindData.bind(this, args.id))
		},
		_bindData: function(id) {
			Log.info(this.getView().getControllerName(), "_bindData")

			var sObjectPath = this.getOwnerComponent()
				.getModel()
				.createKey("Suppliers", { SupplierID: id })

			this.getView().bindElement({
				path: "/" + sObjectPath,
				events: {
					change: function() {
						Log.info(this.getView().getControllerName(), "_bindData change")
						this.getView().setBusy(false)
					}.bind(this),
					dataRequested: function() {
						Log.info(
							this.getView().getControllerName(),
							"_bindData dataRequested"
						)
						this.getView().setBusy(true)
					}.bind(this),
					dataReceived: function() {
						Log.info(
							this.getView().getControllerName(),
							"_bindData dataReceived"
						)
						this.getView().setBusy(false)
						if (this.getView().getBindingContext() === null)
							this.getOwnerComponent()
								.getRouter()
								.getTargets()
								.display("notFound")
					}.bind(this)
				}
			})
		},
		onPressProduct: function(oEvent) {
			Log.info(
				this.getView().getControllerName(),
				"onPressProduct " +
					oEvent
						.getSource()
						.getBindingContext()
						.getObject().ProductID
			)
			this.getOwnerComponent()
				.getRouter()
				.navTo("products", {
					id: oEvent
						.getSource()
						.getBindingContext()
						.getObject().ProductID
				})
		}
	})
})
