var app;
(function (app) {
    var domain;
    (function (domain) {
        var Item = (function () {
            function Item(itemId, itemName, description) {
                this.itemId = itemId;
                this.itemName = itemName;
                this.description = description;
            }
            return Item;
        })();
        domain.Item = Item;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
