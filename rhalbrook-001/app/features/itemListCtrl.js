var app;
(function (app) {
    var itemList;
    (function (itemList) {
        var ItemListCtrl = (function () {
            function ItemListCtrl(dataAccessService) {
                var _this = this;
                this.dataAccessService = dataAccessService;
                this.title = "Things to Learn";
                this.items = [];
                var itemResource = dataAccessService.getItemResource();
                itemResource.query(function (data) {
                    _this.items = data;
                });
            }
            ;
            ItemListCtrl.prototype.addNewItem = function () {
                //alert(this.newItem);
                if (this.newItem) {
                    this.items.push(this.newItem);
                    this.newItem = null;
                }
                else {
                }
            };
            ItemListCtrl.prototype.cancelNewItem = function () {
                this.newItem = null;
            };
            ItemListCtrl.prototype.deleteItem = function (delItem) {
                //alert(delItem);				
                var index = -1;
                for (var i = 0; i < this.items.length; i++) {
                    if (this.items[i].itemId === delItem) {
                        index = i;
                        break;
                    }
                }
                if (index === -1) {
                    alert("Something gone wrong");
                }
                this.items.splice(index, 1);
            };
            ;
            ItemListCtrl.$inject = ["dataAccessService"];
            return ItemListCtrl;
        })();
        angular
            .module("itemListBldr")
            .controller("ItemListCtrl", ItemListCtrl);
    })(itemList = app.itemList || (app.itemList = {}));
})(app || (app = {}));
