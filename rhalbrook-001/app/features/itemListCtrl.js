var controllers;
(function (controllers) {
    var ItemListCtrl = (function () {
        // NOTE: you MUST use the interface here, or your class is tightly-coupled to a specific service class
        function ItemListCtrl(dataAccessService) {
            var _this = this;
            this.dataAccessService = dataAccessService;
            this.title = "Things to Learn";
            this.items = [];
            console.log("inside ItemListCtrl constructor!");
            dataAccessService.getTasks().then(function (data) {
                var arr = data;
                console.log("received " + arr.length + " Tasks in response.");
                _this.items = arr;
            }, function (err) {
                console.error(err);
            });
            // The following lines I commented out are probably best done in the service class, imo
            // var itemResource = dataAccessService.getItemResource();
            // itemResource.query((data: app.domain.IItem[]) => {
            // 	this.items = data;
            // });
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
                if (this.items[i].id === delItem) {
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
    controllers.ItemListCtrl = ItemListCtrl;
})(controllers || (controllers = {}));
