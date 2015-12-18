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
                "epics": [
                    {
                        "id": 12476,
                        "key": "CD-76",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/epic/12476",
                        "name": "Admin Tasks",
                        "summary": "all issues that a just process / admin / whatever",
                        "color": { "key": "color_8" },
                        "done": false
                    },
                    {
                        "id": 13485,
                        "key": "CD-646",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/epic/13485",
                        "name": "Vacation",
                        "summary": "vacation days",
                        "color": { "key": "color_2" },
                        "done": true
                    },
                    {
                        "id": 13352,
                        "key": "CD-566",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/epic/13352",
                        "name": "Medispan database files",
                        "summary": "Import all medispan database files into medispan microservice and integrate functionality into Consolo Core",
                        "color": { "key": "color_1" },
                        "done": true
                    },
                    {
                        "id": 12463,
                        "key": "CD-63",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/epic/12463",
                        "name": "Aide Assistant / Tracker MVP",
                        "summary": "All tasks related to getting Aide Assistant into people's hands",
                        "color": { "key": "color_1" },
                        "done": false
                    },
                    {
                        "id": 12513,
                        "key": "CD-111",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/epic/12513",
                        "name": "Discharge Summary",
                        "summary": "Discharge Summary  (reference only 13285)",
                        "color": { "key": "color_1" },
                        "done": true
                    },
                    {
                        "id": 12464,
                        "key": "CD-64",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/epic/12464",
                        "name": "Supply Chain Requirements Gathering / Design Stage",
                        "summary": "All issues related to getting supply chain scoped and estimated",
                        "color": { "key": "color_3" },
                        "done": false
                    },
                    {
                        "id": 12465,
                        "key": "CD-65",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/epic/12465",
                        "name": "Vagrant / Docker Adoption 1.0",
                        "summary": "all tasks related to getting vagrant / docker ready for developers to use it for the development environments",
                        "color": { "key": "color_5" },
                        "done": true
                    }
                ],
                "foos": [
                    { "id": 1, "type": "A", "itemId": 101, "itemName": "first test foo", "description": "Test 123" },
                    { "id": 2, "type": "B", "itemId": 102, "itemName": "second test foo", "description": "ARAAAAAGH!" }
                ],
                "issues": [
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "14021",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/14021",
                        "key": "CD-883",
                        "fields": {
                            "summary": "Charts: Ability to change patients offline",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "15447",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/15447",
                        "key": "CD-1503",
                        "fields": {
                            "summary": "Automatically add sections that have associated care plan fields. ",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "15749",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/15749",
                        "key": "CD-1657",
                        "fields": {
                            "summary": "Care plans - Offline mode",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "15448",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/15448",
                        "key": "CD-1504",
                        "fields": {
                            "summary": "Mirror data from care plan comments into chart sections.",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "14525",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/14525",
                        "key": "CD-1129",
                        "fields": {
                            "summary": "Dont show disabled encounter types",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "14356",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/14356",
                        "key": "CD-1064",
                        "fields": {
                            "summary": "Multiple entries for sections",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "14355",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/14355",
                        "key": "CD-1063",
                        "fields": {
                            "summary": "Validations and encounter types for custom sections",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "15343",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/15343",
                        "key": "CD-1451",
                        "fields": {
                            "summary": "Add care plans to \"tablet\" clinical charts",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "16138",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/16138",
                        "key": "CD-1739",
                        "fields": {
                            "summary": "Prefetch care plan problems for assigned patients",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "15344",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/15344",
                        "key": "CD-1452",
                        "fields": {
                            "summary": "GET CPP Templates API",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "15720",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/15720",
                        "key": "CD-1618",
                        "fields": {
                            "summary": "Make In & Out date change when Effective date changes",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "15560",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/15560",
                        "key": "CD-1560",
                        "fields": {
                            "summary": "Add care plan interventions to Angular charting.",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "14363",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/14363",
                        "key": "CD-1071",
                        "fields": {
                            "summary": "#14816 UI in core for switching to tablet charting",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "15123",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/15123",
                        "key": "CD-1353",
                        "fields": {
                            "summary": "Re-write care plan problem creation/editing in Angular. ",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "15541",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/15541",
                        "key": "CD-1544",
                        "fields": {
                            "summary": "Care plan templates admin changes to add section dropdown.",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "14237",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/14237",
                        "key": "CD-969",
                        "fields": {
                            "summary": "Integrate caching changes from Jordan's PR",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "15405",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/15405",
                        "key": "CD-1475",
                        "fields": {
                            "summary": "Add ability to apply templates to care plan problems",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "15542",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/15542",
                        "key": "CD-1545",
                        "fields": {
                            "summary": "Add care plan interventions to charts API",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "14537",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/14537",
                        "key": "CD-1140",
                        "fields": {
                            "summary": "Fix issue with sections not highlighting correctly on iPad",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "14407",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/14407",
                        "key": "CD-1087",
                        "fields": {
                            "summary": "#14647 Test Classic/Tablet Charting Switching",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "15342",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/15342",
                        "key": "CD-1450",
                        "fields": {
                            "summary": "Care Plan Problems endpoint. GET:Array needs to include participants and roles",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "13017",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/13017",
                        "key": "CD-366",
                        "fields": {
                            "summary": "Switch aide manager to use material autocomplete ",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "12492",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/12492",
                        "key": "CD-92",
                        "fields": {
                            "summary": "find an iPad for testing for Jeff",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "13122",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/13122",
                        "key": "CD-415",
                        "fields": {
                            "summary": "#14538 Move login to web-client",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "12846",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/12846",
                        "key": "CD-268",
                        "fields": {
                            "summary": "Investigate using BreezeJS for local client ORM",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "12848",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/12848",
                        "key": "CD-270",
                        "fields": {
                            "summary": "UI for general details of clinical charts",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "12850",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/12850",
                        "key": "CD-272",
                        "fields": {
                            "summary": "Angular Charting Patient Time (with Jeff)",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "12851",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/12851",
                        "key": "CD-273",
                        "fields": {
                            "summary": "Angular Charting EVV (with Jeff)",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "12844",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/12844",
                        "key": "CD-266",
                        "fields": {
                            "summary": "scaffold angularJS bits (so get it in place, add links to get to it, integrate deploy etc.)",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "12849",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/12849",
                        "key": "CD-271",
                        "fields": {
                            "summary": "Angular Charting General details (with Jeff)",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "12667",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/12667",
                        "key": "CD-182",
                        "fields": {
                            "summary": "requirements gathering for angular clinical charts",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "12683",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/12683",
                        "key": "CD-198",
                        "fields": {
                            "summary": "requirements gathering for angular clinical charts/API",
                            "customfield_10008": "CD-191"
                        }
                    },
                    {
                        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
                        "id": "15721",
                        "self": "https://consolo.atlassian.net/rest/agile/1.0/issue/15721",
                        "key": "CD-1619",
                        "fields": {
                            "summary": "Make draft list chronological order",
                            "customfield_10008": "CD-191"
                        }
                    }
                ]
            };
            this.$fakeServer.init(data);
            var server = sinon.fakeServer.create();
            server.respondWith(this.$fakeServer.getHandler());
        }
        // GET Epic
        MockDataAccessService.prototype.getEpics = function () {
            var deferred = this.$q.defer();
            console.log("fetching epics...");
            var req = new XMLHttpRequest();
            req.open("GET", "/epics", false);
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
        // GET Issue
        MockDataAccessService.prototype.getIssue = function () {
            var deferred = this.$q.defer();
            console.log("fetching issues...");
            var req = new XMLHttpRequest();
            req.open("GET", "/issues", false);
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
        return MockDataAccessService;
    })();
    services.MockDataAccessService = MockDataAccessService;
})(services || (services = {}));
