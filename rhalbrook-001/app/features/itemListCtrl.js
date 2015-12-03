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
                var arr = data;
                console.log("received " + arr.length + " Tasks in response.");
                _this.items = arr;
            }, function (err) {
                _this.items = [];
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
            alert(delItem);
            this.$myService.deleteTask(this.delItem).then(function (data) {
                // rh: Not sure if this is the way that you do this.  
                // rh: I've been researching it but I can't seem to find anything.
                // rh: My console says that I'm getting into the Delete Method ("deleting one task...")
                // hr: But it is erroring out on the "deferred.resolve(JSON.parse(req.responseText));"
                // hr: So that just tells me that I am trying to send the data to the method incorrectly 
                //this.items.splice(???, 1); 
                _this.delItem = null;
            }, function (err) {
                console.error(err);
            });
        };
        ;
        ItemListCtrl.$inject = ["dataAccessService"];
        return ItemListCtrl;
    })();
    controllers.ItemListCtrl = ItemListCtrl;
})(controllers || (controllers = {}));
