module services {
    
    export class MyDataAccessService implements interfaces.IDataAccessService {
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
                        "itemName": "Object-Oriented Programming",
                        "description": "Learn Object-Oriented Programming (esp. using TypeScript)"
                    },
                    {
                        "id": 2,
                        "itemName": "REST-ful",
                        "description": "Learn REST-ful web services and HTTP request ins-and-outs"
                    },
                    {
                        "id": 3,
                        "itemName": "AngularJS",
                        "description": "Learn AngularJS"
                    },
                    {
                        "id": 4,
                        "itemName": "Material Design",
                        "description": "Learn Material Design"
                    },
                    {
                        "id": 5,
                        "itemName": "TypeScript",
                        "description": "Learn TypeScript"
                    },
                    {
                        "id": 6,
                        "itemName": "Jade",
                        "description": "Learn Jade (HTML template creation)"
                    },
                    {
                        "id": 7,
                        "itemName": "Git",
                        "description": "Learn Advanced Git for SCM"
                    },
                    {
                        "id": 8,
                        "itemName": "Jasmine",
                        "description": "Learn Jasmine for Front-End Unit Testing"
                    },
                    {
                        "id": 9,
                        "itemName": "Design Patterns",
                        "description": "Learn Design Patterns (of various flavors, such as Singleton, delegate, observer, etc.)"
                    },
                    {
                        "id": 10,
                        "itemName": "Ruby & Ruby on Rails",
                        "description": "Learn Ruby & Ruby on Rails (Eventually)"
                    }
                ],
                "foos": [
                    { "id": 1, "name": "first test foo" },
                    { "id": 2, "name": "second test foo" }
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
           return deferred.promise; 
       }
        
        // FIXME: method needs implementation (use getTasks as example)  hint: requires http method DESTROY or DELETE
		deleteTask(obj:interfaces.ITask): ng.IPromise<any> {
            var deferred = this.$q.defer();
            return deferred.promise;
        }
        
        // FIXME: method needs implementation (use getTasks as example)  hint: requires http method PUT
		updateTask(obj:interfaces.ITask): ng.IPromise<interfaces.ITask> {
            var deferred = this.$q.defer();
            return deferred.promise;
        }
        
    }
}