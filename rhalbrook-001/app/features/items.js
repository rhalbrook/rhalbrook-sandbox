var app;
(function (app) {
    var domain;
    (function (domain) {
        var NewItem = (function () {
            function NewItem(itemId, itemName, description) {
                this.itemId = itemId;
                this.itemName = itemName;
                this.description = description;
            }
            return NewItem;
        })();
        domain.NewItem = NewItem;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
