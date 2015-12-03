module services {
    
    export class MockDataAccessService implements interfaces.IDataAccessService {
        //public $httpService: ng.IHttpService;

        public $fakeServer: any;
        
        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
            // this.$httpService = $http;
            
            this.$fakeServer = new FakeRest.Server();
            this.$fakeServer.toggleLogging();
            var data = {
                "tasks": [
                    {
                        "id": 1,
                        "itemId": 101,
                        "itemName": "OOP",
                        "description": "Learn Object-Oriented Programming (esp. using TypeScript)"
                    },
                    {
                        "id": 2,
                        "itemId": 102,
                        "itemName": "REST-ful",
                        "description": "Learn REST-ful web services and HTTP request ins-and-outs"
                    },
                    {
                        "id": 3,
                        "itemId": 103,
                        "itemName": "AngularJS",
                        "description": "Learn AngularJS"
                    },
                    /*{
                        "id": 4,
                        "itemId": 104,
                        "itemName": "Material Design",
                        "description": "Learn Material Design"
                    },
                    {
                        "id": 5,
                        "itemId": 105,
                        "itemName": "TypeScript",
                        "description": "Learn TypeScript"
                    },
                    {
                        "id": 6,
                        "itemId": 106,
                        "itemName": "Jade",
                        "description": "Learn Jade (HTML template creation)"
                    },
                    {
                        "id": 7,
                        "itemId": 107,
                        "itemName": "Git",
                        "description": "Learn Advanced Git for SCM"
                    },
                    {
                        "id": 8,
                        "itemId": 108,
                        "itemName": "Jasmine",
                        "description": "Learn Jasmine for Front-End Unit Testing"
                    },
                    {
                        "id": 9,
                        "itemId": 109,
                        "itemName": "Design Patterns",
                        "description": "Learn Design Patterns (of various flavors, such as Singleton, delegate, observer, etc.)"
                    },*/
                    {
                        "id": 10,
                        "itemId": 110,
                        "itemName": "Ruby & Ruby on Rails",
                        "description": "Learn Ruby & Ruby on Rails (Eventually)"
                    }
                ],
                "foos": [
                    { "id": 1, "itemId": 101, "itemName": "first test foo", "description": "Test 123" },
                    { "id": 2, "itemId": 102, "itemName": "second test foo", "description": "ARAAAAAGH!"}
                ]
            };
            this.$fakeServer.init(data);
            var server = sinon.fakeServer.create();
            server.respondWith(this.$fakeServer.getHandler());
        }



        getTasks(): ng.IPromise<interfaces.ITask[]> {
            var deferred = this.$q.defer();
            console.log("fetching tasks...");
            var req = new XMLHttpRequest();
            req.open("GET", "/tasks", false);
            req.onload = (e) => {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        deferred.resolve(JSON.parse(req.responseText));
                    } else {
                        console.error(req.statusText);
                        deferred.reject(req.statusText);
                    }
                } else {
                    debugger;
                }
            };
            req.onerror = (e) => {
                console.error(req.statusText);
                deferred.reject(e);
            };
            req.send(null);
            return deferred.promise;
        }
        
        // FIXME: method needs implementation (use getTasks as example)  hint: requires http method POST
        addTask(obj:interfaces.ITask): ng.IPromise<interfaces.ITask> {
            var deferred = this.$q.defer();
             console.log("adding one task...");
            var req = new XMLHttpRequest();
            req.open("POST", "/tasks", false);
            req.onload = (e) => {
                if (req.readyState === 4) {
                    deferred.resolve(JSON.parse(req.responseText));
                } else {
                    debugger;
                }
            };
            req.onerror = (e) => {
                console.error(req.statusText);
                deferred.reject(e);
            };
            req.send(JSON.stringify(obj));
           return deferred.promise; 
       }
        
        // FIXME: method needs implementation (use getTasks as example)  hint: requires http method DESTROY or DELETE
		deleteTask(obj:interfaces.ITask): ng.IPromise<any> {
            var deferred = this.$q.defer();
            console.log(deferred);
            console.log("deleting one task...");
            var req = new XMLHttpRequest();
            console.log(req);
            req.open("DELETE", "/tasks/id", false);
            req.onload = (e) => {
                if (req.readyState === 4) {
                    deferred.resolve(JSON.parse(req.responseText));
                } else {
                    debugger;
                }
            };
            req.onerror = (e) => {
                console.error(req.statusText);
                deferred.reject(e);
            };
            req.send(JSON.stringify(obj));
            return deferred.promise;
        }
        
        // FIXME: method needs implementation (use getTasks as example)  hint: requires http method PUT
		updateTask(obj:interfaces.ITask): ng.IPromise<interfaces.ITask> {
            var deferred = this.$q.defer();
            return deferred.promise;
        }
        
    }
}