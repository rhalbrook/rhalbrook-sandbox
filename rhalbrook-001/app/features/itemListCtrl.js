var app;
(function (app) {
    var itemList;
    (function (itemList) {
        var ItemListCtrl = (function () {
            function ItemListCtrl() {
                this.title = "Things to Learn";
                this.items = [
                    {
                        "itemId": 1,
                        "itemName": "Object-Oriented Programming",
                        "description": "Learn Object-Oriented Programming (esp. using TypeScript)"
                    },
                    {
                        "itemId": 2,
                        "itemName": "REST-ful",
                        "description": "Learn REST-ful web services and HTTP request ins-and-outs"
                    },
                    {
                        "itemId": 3,
                        "itemName": "AngularJS",
                        "description": "Learn AngularJS"
                    },
                    {
                        "itemId": 4,
                        "itemName": "Material Design",
                        "description": "Learn Material Design"
                    },
                    {
                        "itemId": 5,
                        "itemName": "TypeScript",
                        "description": "Learn TypeScript"
                    },
                    {
                        "itemId": 6,
                        "itemName": "Jade",
                        "description": "Learn Jade (HTML template creation)"
                    },
                    {
                        "itemId": 7,
                        "itemName": "Git",
                        "description": "Learn Advanced Git for SCM"
                    },
                    {
                        "itemId": 8,
                        "itemName": "Jasmine",
                        "description": "Learn Jasmine for Front-End Unit Testing"
                    },
                    {
                        "itemId": 9,
                        "itemName": "Design Patterns",
                        "description": "Learn Design Patterns (of various flavors, such as Singleton, delegate, observer, etc.)"
                    },
                    {
                        "itemId": 10,
                        "itemName": "Ruby & Ruby on Rails",
                        "description": "Learn Ruby & Ruby on Rails (Eventually)"
                    }
                ];
                //var newItem = new app.domain.NewItem(11, "GULP", "Learn GULP & GULP BrowserSync");
                //this.items.push(newItem);
            }
            ;
            ItemListCtrl.prototype.addNewItem = function () {
                //Do something here
            };
            return ItemListCtrl;
        })();
        angular
            .module("itemListBldr")
            .controller("ItemListCtrl", ItemListCtrl);
    })(itemList = app.itemList || (app.itemList = {}));
})(app || (app = {}));
