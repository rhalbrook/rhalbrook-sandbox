var controllers;
(function (controllers) {
    var ItemListCtrl = (function () {
        function ItemListCtrl(dataAccessService) {
            var _this = this;
            this.dataAccessService = dataAccessService;
            this.title = "JIRA Filter Views";
            this.epics = [];
            this.issues = [];
            console.log("inside ItemListCtrl constructor!");
            this.$myService = dataAccessService;
            // GET EPICS
            this.$myService.getEpics().then(function (data) {
                console.log("- Received " + data.length + " Epics");
                _this.epics = data;
                // START EPIC LOOP
                _this.epics.forEach(function (epic) {
                    epic.Total = 0;
                    epic.Blocked = 0;
                    epic.Open = 0;
                    epic.inProgress = 0;
                    epic.readyToTest = 0;
                    epic.passedTests = 0;
                    epic.Closed = 0;
                    // GET ISSUES
                    _this.$myService.getIssues(epic.id).then(function (data) {
                        console.log("--- Received " + data.length + " Issues");
                        epic.issues = data;
                        epic.issues.forEach(function (issue) {
                            // Total Issues
                            epic.Total++;
                            // Checking for STATUS
                            if (issue.fields.status.id === '10001') {
                                epic.Blocked++;
                            }
                            if (issue.fields.status.id === '1' || issue.fields.status.id === '4') {
                                epic.Open++;
                            }
                            if (issue.fields.status.id === '3') {
                                epic.inProgress++;
                            }
                            if (issue.fields.status.id === '10300') {
                                epic.readyToTest++;
                            }
                            if (issue.fields.status.id === '10302') {
                                epic.passedTests++;
                            }
                            if (issue.fields.status.id === '6' || issue.fields.status.id === '10301') {
                                epic.Closed++;
                            }
                            // ADDED TO LOOK FOR MISSING STATUS ID
                            //console.log(['10001','1', '4', '3','10300','10302','6'].indexOf(issue.fields.status.id))
                            // if (['10001','1', '4', '3','10300','10302','6'].indexOf(issue.fields.status.id) === -1) {
                            //     alert(issue.fields.status.id + ' ' + issue.fields.status.name);
                            // }
                        });
                        //console.log(this.issues);
                    }, function (err) {
                        console.error(err);
                    });
                    // END GET ISSUES
                });
                // END EPIC LOOP
            }, function (err) {
                console.error(err);
            });
            // END GET EPICS
        }
        Object.defineProperty(ItemListCtrl.prototype, "search", {
            get: function () {
                return this._search;
            },
            set: function (theSearch) {
                console.log("search: " + theSearch);
                this._search = theSearch;
            },
            enumerable: true,
            configurable: true
        });
        ;
        ItemListCtrl.prototype.justAlert = function (myAlert) {
            if (myAlert == 1) {
                alert("Open Issue in JIRA");
            }
        };
        ItemListCtrl.$inject = ["dataAccessService"];
        return ItemListCtrl;
    })();
    controllers.ItemListCtrl = ItemListCtrl;
})(controllers || (controllers = {}));
