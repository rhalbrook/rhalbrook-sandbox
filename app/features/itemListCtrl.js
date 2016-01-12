var controllers;
(function (controllers) {
    var ItemListCtrl = (function () {
        function ItemListCtrl(dataAccessService, $filter) {
            var _this = this;
            this.dataAccessService = dataAccessService;
            this.$filter = $filter;
            this.title = "JIRA Filter Views";
            this.epics = [];
            this.issues = [];
            this.sprints = [];
            this.searchTerm = '';
            console.log("inside ItemListCtrl constructor!");
            this.$myService = dataAccessService;
            // GET EPICS
            this.$myService.getEpics().then(function (data) {
                console.log("- Received " + data.length + " Epics");
                _this.filteredEpics = [];
                _this.epics = data;
                // START EPIC LOOP
                _this.epics.forEach(function (epic) {
                    // GET ISSUES
                    _this.$myService.getIssues(epic.id).then(function (data) {
                        console.log("-- Received " + data.length + " Issues");
                        epic.issues = data;
                        _this.filterEpic(epic);
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
            // GET SPRINTS
            this.$myService.getSprints().then(function (data) {
                console.log("--- received " + data.length + " Sprints");
                _this.sprints = data;
                _this.sprints.forEach(function (sprint) {
                    _this.latestSprintName = sprint.name;
                });
            }, function (err) {
                console.error(err);
            });
        }
        ;
        // CALCULATE TOTALS
        ItemListCtrl.prototype.calculateTotals = function (epic) {
            epic.Total = 0;
            epic.Blocked = 0;
            epic.Open = 0;
            epic.inProgress = 0;
            epic.readyToTest = 0;
            epic.passedTests = 0;
            epic.Closed = 0;
            // CHECK STATUS TOTALS
            epic.issues.forEach(function (issue) {
                // TOTAL ISSUES
                epic.Total++;
                // CHECKING FOR STATUS
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
            });
        };
        // DO SEARCH FUNCTION INPUT ONCHANGE
        ItemListCtrl.prototype.doSearch = function () {
            var _this = this;
            console.log("search: " + this.searchTerm);
            this.filteredEpics.length = 0;
            this.epics.forEach(function (epic) {
                var filteredEpic;
                filteredEpic = angular.copy(epic);
                _this.filterEpic(filteredEpic);
            });
        };
        // FILTERS EMPTY EPICS FROM SHOWING
        ItemListCtrl.prototype.filterEpic = function (epic) {
            epic.issues = this.$filter('filter')(epic.issues, this.searchTerm);
            if (epic.issues.length > 0 || this.searchTerm === '') {
                this.calculateTotals(epic);
                this.filteredEpics.push(epic);
            }
        };
        ItemListCtrl.$inject = ['dataAccessService', '$filter'];
        return ItemListCtrl;
    })();
    controllers.ItemListCtrl = ItemListCtrl;
})(controllers || (controllers = {}));
