var services;
(function (services) {
    var MockDataAccessService = (function () {
        function MockDataAccessService($http, $q) {
            // this.$httpService = $http;
            this.$http = $http;
            this.$q = $q;
            this.$fakeServer = new FakeRest.Server();
            this.$fakeServer.toggleLogging();
            var data = {
                "tasks": [
                    {
                        "id": 1,
                        "type": "A",
                        "itemId": 101,
                        "itemName": "OOP",
                        "description": "Learn Object-Oriented Programming (esp. using TypeScript)"
                    },
                    {
                        "id": 2,
                        "type": "B",
                        "itemId": 102,
                        "itemName": "REST-ful",
                        "description": "Learn REST-ful web services and HTTP request ins-and-outs"
                    },
                    {
                        "id": 3,
                        "type": "C",
                        "itemId": 103,
                        "itemName": "AngularJS",
                        "description": "Learn AngularJS"
                    },
                    {
                        "id": 4,
                        "type": "A",
                        "itemId": 104,
                        "itemName": "Material Design",
                        "description": "Learn Material Design"
                    },
                    {
                        "id": 5,
                        "type": "B",
                        "itemId": 105,
                        "itemName": "TypeScript",
                        "description": "Learn TypeScript"
                    },
                    {
                        "id": 6,
                        "type": "C",
                        "itemId": 106,
                        "itemName": "Jade",
                        "description": "Learn Jade (HTML template creation)"
                    },
                    {
                        "id": 7,
                        "type": "A",
                        "itemId": 107,
                        "itemName": "Git",
                        "description": "Learn Advanced Git for SCM"
                    },
                    {
                        "id": 8,
                        "type": "B",
                        "itemId": 108,
                        "itemName": "Jasmine",
                        "description": "Learn Jasmine for Front-End Unit Testing"
                    },
                    {
                        "id": 9,
                        "type": "C",
                        "itemId": 109,
                        "itemName": "Design Patterns",
                        "description": "Learn Design Patterns (of various flavors, such as Singleton, delegate, observer, etc.)"
                    },
                    {
                        "id": 10,
                        "type": "A",
                        "itemId": 110,
                        "itemName": "Ruby & Ruby on Rails",
                        "description": "Learn Ruby & Ruby on Rails (Eventually)"
                    }
                ],
                "foos": [
                    { "id": 1, "type": "A", "itemId": 101, "itemName": "first test foo", "description": "Test 123" },
                    { "id": 2, "type": "B", "itemId": 102, "itemName": "second test foo", "description": "ARAAAAAGH!" }
                ]
            };
            this.$fakeServer.init(data);
            var server = sinon.fakeServer.create();
            server.respondWith(this.$fakeServer.getHandler());
        }
        // GET TASK
        MockDataAccessService.prototype.getTasks = function () {
            var deferred = this.$q.defer();
            console.log("fetching tasks...");
            var req = new XMLHttpRequest();
            req.open("GET", "/tasks", false);
            req.onload = function (e) {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        deferred.resolve(JSON.parse(req.responseText));
                    }
                    else {
                        console.error(req.statusText);
                        deferred.reject(req.statusText);
                    }
                }
                else {
                    debugger;
                }
            };
            req.onerror = function (e) {
                console.error(req.statusText);
                deferred.reject(e);
            };
            req.send(null);
            return deferred.promise;
        };
        // FIXME: method needs implementation (use getTasks as example)  hint: requires http method POST
        MockDataAccessService.prototype.addTask = function (obj) {
            var deferred = this.$q.defer();
            console.log("adding one task...");
            var req = new XMLHttpRequest();
            req.open("POST", "/tasks", false);
            req.onload = function (e) {
                if (req.readyState === 4) {
                    deferred.resolve(JSON.parse(req.responseText));
                }
                else {
                    debugger;
                }
            };
            req.onerror = function (e) {
                console.error(req.statusText);
                deferred.reject(e);
            };
            req.send(JSON.stringify(obj));
            return deferred.promise;
        };
        // FIXME: method needs implementation (use getTasks as example)  hint: requires http method DESTROY or DELETE
        MockDataAccessService.prototype.deleteTask = function (obj) {
            var deferred = this.$q.defer();
            console.log("deleting one task...");
            var req = new XMLHttpRequest();
            req.open("DELETE", "/tasks/" + obj.id, false);
            req.onload = function (e) {
                if (req.readyState === 4) {
                    deferred.resolve(JSON.parse(req.responseText));
                }
                else {
                    debugger;
                }
            };
            req.onerror = function (e) {
                console.error(req.statusText);
                deferred.reject(e);
            };
            req.send(JSON.stringify(obj));
            return deferred.promise;
        };
        // FIXME: method needs implementation (use getTasks as example)  hint: requires http method PUT
        MockDataAccessService.prototype.updateTask = function (obj) {
            var deferred = this.$q.defer();
            console.log("udating one task...");
            console.log(obj);
            var req = new XMLHttpRequest();
            req.open("PUT", "/tasks/" + obj.id, false);
            req.onload = function (e) {
                if (req.readyState === 4) {
                    deferred.resolve(JSON.parse(req.responseText));
                }
                else {
                    debugger;
                }
            };
            req.onerror = function (e) {
                console.error(req.statusText);
                deferred.reject(e);
            };
            req.send(JSON.stringify(obj));
            console.log("heading back...");
            return deferred.promise;
        };
        return MockDataAccessService;
    })();
    services.MockDataAccessService = MockDataAccessService;
})(services || (services = {}));
