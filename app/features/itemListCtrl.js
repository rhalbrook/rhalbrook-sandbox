var controllers;
(function (controllers) {
    var ItemListCtrl = (function () {
        function ItemListCtrl(dataAccessService, $filter) {
            var _this = this;
            this.dataAccessService = dataAccessService;
            this.$filter = $filter;
            this.showChart = false;
            this.options = {
                chart: {
                    type: 'multiBarChart',
                    height: 450,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 99,
                        left: 55
                    },
                    clipEdge: true,
                    duration: 500,
                    stacked: true,
                    reduceXTicks: false,
                    xAxis: {
                        axisLabel: 'EPICS',
                        staggerLabels: false,
                        rotateLabels: 45,
                        rotateYLabel: true,
                    },
                    yAxis: {
                        axisLabel: 'ISSUES',
                        axisLabelDistance: -10
                    }
                }
            };
            this.chartData = [
                {
                    key: "Blocked",
                    values: []
                },
                {
                    key: "Open",
                    values: []
                },
                {
                    key: "inProgress",
                    values: []
                },
                {
                    key: "readyToTest",
                    values: []
                },
                {
                    key: "passedTests",
                    values: []
                },
                {
                    key: "Closed",
                    values: []
                }
            ];
            this.listTitle = "JIRA Filter Views";
            this.chartTitle = "JIRA Epic / Issues Chart";
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
            // Chart Data
            var blocked = this.$filter('filter')(this.chartData, { key: "Blocked" });
            blocked[0].values.push({ "x": epic.key, "y": epic.Blocked });
            var open = this.$filter('filter')(this.chartData, { key: "Open" });
            open[0].values.push({ "x": epic.key, "y": epic.Open });
            var inprogress = this.$filter('filter')(this.chartData, { key: "InProgress" });
            inprogress[0].values.push({ "x": epic.key, "y": epic.inProgress });
            var readytotest = this.$filter('filter')(this.chartData, { key: "readyToTest" });
            readytotest[0].values.push({ "x": epic.key, "y": epic.readyToTest });
            var passedtests = this.$filter('filter')(this.chartData, { key: "passedTests" });
            passedtests[0].values.push({ "x": epic.key, "y": epic.passedTests });
            var closed = this.$filter('filter')(this.chartData, { key: "Closed" });
            closed[0].values.push({ "x": epic.key, "y": epic.Closed });
            console.log(this.chartData);
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
        ItemListCtrl.prototype.toggleView = function () {
            this.showChart = !this.showChart;
            window.dispatchEvent(new Event('resize'));
        };
        ItemListCtrl.$inject = ['dataAccessService', '$filter'];
        return ItemListCtrl;
    })();
    controllers.ItemListCtrl = ItemListCtrl;
})(controllers || (controllers = {}));
