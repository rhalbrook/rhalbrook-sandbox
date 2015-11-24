var app;
(function (app) {
    var common;
    (function (common) {
        var mockResource = angular
            .module("itemResourceMock", ["ngMockE2E"]);
        mockResource.run(mockRun);
        mockRun.$inject = ["$httpBackend"];
        function mockRun($httpBackend) {
            var items = [];
            var item;
            item = new app.domain.Item(1, "Object-Oriented Programming", "Learn Object-Oriented Programming (esp. using TypeScript)");
            items.push(item);
            item = new app.domain.Item(2, "REST-ful", "Learn REST-ful web services and HTTP request ins-and-outs");
            items.push(item);
            item = new app.domain.Item(3, "AngularJS", "Learn AngularJS");
            items.push(item);
            item = new app.domain.Item(4, "Material Design", "Learn Material Design");
            items.push(item);
            item = new app.domain.Item(5, "TypeScript", "Learn TypeScript");
            items.push(item);
            item = new app.domain.Item(6, "Jade", "Learn Jade (HTML template creation)");
            items.push(item);
            item = new app.domain.Item(7, "Git", "Learn Advanced Git for SCM");
            items.push(item);
            item = new app.domain.Item(8, "Jasmine", "Learn Jasmine for Front-End Unit Testing");
            items.push(item);
            item = new app.domain.Item(9, "Design Patterns", "Learn Design Patterns (of various flavors, such as Singleton, delegate, observer, etc.)");
            items.push(item);
            item = new app.domain.Item(10, "Ruby & Ruby on Rails", "Learn Ruby & Ruby on Rails (Eventually)");
            items.push(item);
            var itemUrl = "/api/items";
            $httpBackend.whenGET(itemUrl).respond(items);
            var editingRegex = new RegExp(itemUrl + "/[0-9][0-9]*", '');
            $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
                var item = { "itemId": 0 };
                var parameters = url.split('/');
                var length = parameters.length;
                var id = +parameters[length - 1];
                if (id > 0) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].itemId == id) {
                            item = items[i];
                            break;
                        }
                    }
                }
                return [200, item, {}];
            });
            // Catch all for testing purposes
            $httpBackend.whenGET(/api/).respond(function (method, url, data) {
                return [200, items, {}];
            });
            // Pass through any requests for application files
            $httpBackend.whenGET(/app/).passThrough();
        }
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
