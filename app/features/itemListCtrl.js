var controllers;
(function (controllers) {
    var ItemListCtrl = (function () {
        function ItemListCtrl(dataAccessService) {
            var _this = this;
            this.dataAccessService = dataAccessService;
            this.title = "JIRA Filtered Views";
            this.epics = [];
            console.log("inside ItemListCtrl constructor!");
            this.$myService = dataAccessService;
            this.$myService.getEpics().then(function (data) {
                console.log("received " + data.length + " Epics in response.");
                _this.epics = data;
            }, function (err) {
                console.error(err);
            });
        }
        Object.defineProperty(ItemListCtrl.prototype, "search", {
            get: function () {
                return this._search;
            },
            set: function (theSearch) {
                console.log("search: " + theSearch);
                this._search = theSearch;
            },
            enumerable: true,
            configurable: true
        });
        ;
        ItemListCtrl.$inject = ["dataAccessService"];
        return ItemListCtrl;
    })();
    controllers.ItemListCtrl = ItemListCtrl;
})(controllers || (controllers = {}));
