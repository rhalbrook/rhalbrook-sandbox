var controllers;
(function (controllers) {
    var ItemListCtrl = (function () {
        function ItemListCtrl(dataAccessService) {
            var _this = this;
            this.dataAccessService = dataAccessService;
            this.title = "JIRA Filter Views";
            this.epics = [];
            this.issues = [];
            console.log("inside ItemListCtrl constructor!");
            this.$myService = dataAccessService;
            this.$myService.getEpics().then(function (data) {
                console.log("received " + data.length + " Epics in response.");
                _this.epics = data;
                // START EPIC LOOP
                for (var key in _this.epics) {
                    // GET ISSUES    
                    _this.$myService.getIssues(_this.epics[key].id).then(function (data) {
                        console.log("received " + data.length + " Issues in response.");
                        _this.issues = data;
                    }, function (err) {
                        console.error(err);
                    });
                }
                // END EPIC LOOP
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
        ItemListCtrl.prototype.justAlert = function (myAlert) {
            if (myAlert == 1) {
                alert("Open Issue in JIRA");
            }
        };
        ItemListCtrl.$inject = ["dataAccessService"];
        return ItemListCtrl;
    })();
    controllers.ItemListCtrl = ItemListCtrl;
})(controllers || (controllers = {}));
