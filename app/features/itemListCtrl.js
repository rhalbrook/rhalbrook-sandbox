var controllers;
(function (controllers) {
    var ItemListCtrl = (function () {
        // NOTE: you MUST use the interface here, or your class is tightly-coupled to a specific service class
        function ItemListCtrl(dataAccessService) {
            var _this = this;
            this.dataAccessService = dataAccessService;
            this.title = "Ralph's list of things to learn";
            this.items = [];
            console.log("inside ItemListCtrl constructor!");
            this.$myService = dataAccessService;
            this.$myService.getTasks().then(function (data) {
                console.log("received " + data.length + " Tasks in response.");
                _this.items = data;
            }, function (err) {
                console.error(err);
            });
            // The following lines I commented out are probably best done in the service class, imo
            // var itemResource = dataAccessService.getItemResource();
            // itemResource.query((data: app.domain.IItem[]) => {
            // 	this.items = data;
            // });
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
        ItemListCtrl.prototype.addNewItem = function () {
            var _this = this;
            this.$myService.addTask(this.newItem).then(function (data) {
                _this.items.push(data);
                _this.newItem = null;
            }, function (err) {
                console.error(err);
            });
        };
        ItemListCtrl.prototype.cancelNewItem = function () {
            this.newItem = null;
        };
        ItemListCtrl.prototype.deleteItem = function (delItem) {
            var _this = this;
            this.$myService.deleteTask(delItem).then(function (data) {
                var index = _this.items.indexOf(delItem);
                _this.items.splice(index, 1);
                _this.delItem = null;
            }, function (err) {
                console.error(err);
            });
        };
        ItemListCtrl.prototype.editItem = function (edItem) {
            var _this = this;
            console.log("Starting Edit...");
            this.$myService.updateTask(edItem).then(function (data) {
                var index = _this.items.indexOf(edItem);
                console.log("I'm Back");
                _this.edItem = null;
            }, function (err) {
                console.error(err);
            });
        };
        ItemListCtrl.prototype.justAlert = function (myAlert) {
            if (myAlert == 1) {
                alert("This will have categories soon :)");
            }
        };
        ItemListCtrl.prototype.openMenu = function ($mdOpenMenu, ev) {
            var originatorEv;
            originatorEv = ev;
            $mdOpenMenu(ev);
        };
        ItemListCtrl.$inject = ["dataAccessService"];
        return ItemListCtrl;
    })();
    controllers.ItemListCtrl = ItemListCtrl;
})(controllers || (controllers = {}));