module controllers {
  export interface ItemListModel {
    listTitle: string;
    chartTitle: string;
    latestSprintName: string;
    epics: interfaces.IEpic[];
    filteredEpics: interfaces.IEpic[];
    issues: interfaces.IIssue[];
    sprints: interfaces.ISprint[];
    searchTerm: string;
  }

  export class ItemListCtrl implements ItemListModel {
    listTitle: string;
    chartTitle: string;
    latestSprintName: string;
    epics: interfaces.IEpic[];
    filteredEpics: interfaces.IEpic[];
    issues: interfaces.IIssue[];
    sprints: interfaces.ISprint[];
    searchTerm: string;
    showChart: boolean = false;
    chartData: any[];
    options: any;

    public $myService: interfaces.IDataAccessService;

    static $inject = ['dataAccessService', '$filter'];

    constructor(private dataAccessService: interfaces.IDataAccessService, private $filter: ng.IFilterService) {
      // D3 CHART
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
      // CHART DATA BUILD - STATUS
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
      this.chartTitle = "JIRA Epic / Issues Chart"
      this.epics = [];
      this.issues = [];
      this.sprints = [];
      this.searchTerm = '';
      console.log("inside ItemListCtrl constructor!");

      this.$myService = dataAccessService;
      // GET EPICS
      this.$myService.getEpics().then((data: interfaces.IEpic[]) => {
        console.log("- Received " + data.length + " Epics");
        this.filteredEpics = [];
        this.epics = data;

        // START EPIC LOOP
        this.epics.forEach((epic: interfaces.IEpic) => {
          // GET ISSUES
          this.$myService.getIssues(epic.id).then((data: interfaces.IIssue[]) => {
            console.log("-- Received " + data.length + " Issues");
            epic.issues = data;
            this.filterEpic(epic);
            //console.log(this.issues);
          }, (err) => {
            console.error(err);
          });
          // END GET ISSUES
        });
        // END EPIC LOOP
      }, (err) => {
        console.error(err);
      });
      // END GET EPICS
      // GET SPRINTS
      this.$myService.getSprints().then((data: interfaces.ISprint[]) => {
        console.log("--- received " + data.length + " Sprints");
        this.sprints = data;
        this.sprints.forEach((sprint) => {
          this.latestSprintName = sprint.name;
        });
      }, (err) => {
        console.error(err);
      });
    };
    // CALCULATE TOTALS
    calculateTotals(epic: interfaces.IEpic) {
      epic.Total = 0;
      epic.Blocked = 0;
      epic.Open = 0;
      epic.inProgress = 0;
      epic.readyToTest = 0;
      epic.passedTests = 0;
      epic.Closed = 0;
      // CHECK STATUS TOTALS
      epic.issues.forEach((issue: interfaces.IIssue) => {
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
      // CHART DATA BUILD
      var blocked = this.$filter('filter')(this.chartData, {key: "Blocked"});
      blocked[0].values.push({"x": epic.key, "y": epic.Blocked});
      var open = this.$filter('filter')(this.chartData, {key: "Open"});
      open[0].values.push({"x": epic.key, "y": epic.Open});
      var inprogress = this.$filter('filter')(this.chartData, {key: "InProgress"});
      inprogress[0].values.push({"x": epic.key, "y": epic.inProgress});
      var readytotest = this.$filter('filter')(this.chartData, {key: "readyToTest"});
      readytotest[0].values.push({"x": epic.key, "y": epic.readyToTest});
      var passedtests = this.$filter('filter')(this.chartData, {key: "passedTests"});
      passedtests[0].values.push({"x": epic.key, "y": epic.passedTests});
      var closed = this.$filter('filter')(this.chartData, {key: "Closed"});
      closed[0].values.push({"x": epic.key, "y": epic.Closed});
      console.log(this.chartData);
    }
    // DO SEARCH FUNCTION INPUT ONCHANGE
    doSearch(): void {
      console.log("search: " + this.searchTerm);
      this.filteredEpics.length = 0;

      this.epics.forEach((epic) => {
        var filteredEpic: interfaces.IEpic;
        filteredEpic = angular.copy(epic);
        this.filterEpic(filteredEpic);
      });
    }
    // FILTERS EMPTY EPICS FROM SHOWING
    filterEpic(epic: interfaces.IEpic): void {
      epic.issues = this.$filter('filter')(epic.issues, this.searchTerm);
      if (epic.issues.length > 0 || this.searchTerm === '') {
        this.calculateTotals(epic);
        this.filteredEpics.push(epic);
      }
    }
    // TOGGLE VIEW BETWEEN LIST AND CHART
    toggleView(): void {
      this.showChart = !this.showChart;
      window.dispatchEvent(new Event('resize'));
    }
  }
}