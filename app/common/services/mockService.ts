module services {
    
    export class MockDataAccessService implements interfaces.IDataAccessService {
        //public $httpService: ng.IHttpService;

        public $fakeServer: any;
        
        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
            // this.$httpService = $http;
            
            this.$fakeServer = new FakeRest.Server();
            this.$fakeServer.toggleLogging();
            var data = {
                "epics": [
                    {
                        "id":12476,
                        "key":"CD-76",
                        "self":"https://consolo.atlassian.net/rest/agile/1.0/epic/12476",
                        "name":"Admin Tasks",
                        "summary":"all issues that a just process / admin / whatever",
                        "color":{"key":"color_8"},
                        "done":false
                    },
                    {
                        "id":13485,
                        "key":"CD-646",
                        "self":"https://consolo.atlassian.net/rest/agile/1.0/epic/13485",
                        "name":"Vacation",
                        "summary":"vacation days",
                        "color":{"key":"color_2"},
                        "done":true
                    },
                    {
                        "id":13352,
                        "key":"CD-566",
                        "self":"https://consolo.atlassian.net/rest/agile/1.0/epic/13352",
                        "name":"Medispan database files",
                        "summary":"Import all medispan database files into medispan microservice and integrate functionality into Consolo Core",
                        "color":{"key":"color_1"},
                        "done":true
                    },
                    {
                        "id":12463,
                        "key":"CD-63",
                        "self":"https://consolo.atlassian.net/rest/agile/1.0/epic/12463",
                        "name":"Aide Assistant / Tracker MVP",
                        "summary":"All tasks related to getting Aide Assistant into people's hands",
                        "color":{"key":"color_1"},
                        "done":false
                    },
                    {
                        "id":12513,
                        "key":"CD-111",
                        "self":"https://consolo.atlassian.net/rest/agile/1.0/epic/12513",
                        "name":"Discharge Summary",
                        "summary":"Discharge Summary  (reference only 13285)",
                        "color":{"key":"color_1"},
                        "done":true
                    },
                    {
                        "id":12464,
                        "key":"CD-64",
                        "self":"https://consolo.atlassian.net/rest/agile/1.0/epic/12464",
                        "name":"Supply Chain Requirements Gathering / Design Stage",
                        "summary":"All issues related to getting supply chain scoped and estimated",
                        "color":{"key":"color_3"},
                        "done":false
                    },
                    {
                        "id":12465,
                        "key":"CD-65",
                        "self":"https://consolo.atlassian.net/rest/agile/1.0/epic/12465",
                        "name":"Vagrant / Docker Adoption 1.0",
                        "summary":"all tasks related to getting vagrant / docker ready for developers to use it for the development environments",
                        "color":{"key":"color_5"},
                        "done":true
                    }
                ],
                "foos": [
                    { "id": 1, "type": "A", "itemId": 101, "itemName": "first test foo", "description": "Test 123" },
                    { "id": 2, "type": "B", "itemId": 102, "itemName": "second test foo", "description": "ARAAAAAGH!"}
                ]
            };
            this.$fakeServer.init(data);
            var server = sinon.fakeServer.create();
            server.respondWith(this.$fakeServer.getHandler());
        }

        // GET Epic
        getEpics(): ng.IPromise<interfaces.IEpic[]> {
            var deferred = this.$q.defer();
            console.log("fetching tasks...");
            var req = new XMLHttpRequest();
            req.open("GET", "/epics", false);
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
    }
}