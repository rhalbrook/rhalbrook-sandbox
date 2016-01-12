module controllers {
  export interface ItemListModel {
    title: string;
    latestSprintName: string;
    epics: interfaces.IEpic[];
    filteredEpics: interfaces.IEpic[];
    issues: interfaces.IIssue[];
    sprints: interfaces.ISprint[];
    searchTerm: string;
  }

  export class ItemListCtrl implements ItemListModel {
    title: string;
    latestSprintName: string;
    epics: interfaces.IEpic[];
    filteredEpics: interfaces.IEpic[];
    issues: interfaces.IIssue[];
    sprints: interfaces.ISprint[];
    searchTerm: string;

    public $myService: interfaces.IDataAccessService;

    static $inject = ['dataAccessService', '$filter'];

    constructor(private dataAccessService: interfaces.IDataAccessService, private $filter: ng.IFilterService) {
      this.title = "JIRA Filter Views";
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
  }
}