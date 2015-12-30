module controllers {
    export interface ItemListModel {
        title: string;
        epics: interfaces.IEpics[];
        issues: interfaces.IIssues[];
        justAlert(myAlert): void;
    }

    export class ItemListCtrl implements ItemListModel {
        title: string;
        epics: interfaces.IEpics[];
        issues: interfaces.IIssues[];
        private _search: string;

        get search(): string {
            return this._search;
        }
        set search(theSearch: string) {
            console.log("search: " + theSearch);
            this._search = theSearch;
        }
        public $myService: interfaces.IDataAccessService;

        static $inject = ["dataAccessService"];

        constructor(private dataAccessService: interfaces.IDataAccessService) {
            this.title = "JIRA Filter Views";
            this.epics = [];
            this.issues = [];
            console.log("inside ItemListCtrl constructor!");

            this.$myService = dataAccessService;
            // GET EPICS
            this.$myService.getEpics().then((data: interfaces.IEpics[]) => {
                console.log("- Received " + data.length + " Epics");
                this.epics = data;
                
                // START EPIC LOOP
                this.epics.forEach((epic) => {
                    epic.Total = 0;
                    epic.Blocked = 0;
                    epic.Open = 0;
                    epic.inProgress = 0;
                    epic.readyToTest = 0;
                    epic.passedTests = 0;
                    epic.Closed = 0;
                    // GET ISSUES
                    this.$myService.getIssues(epic.id).then((data: interfaces.IIssues[]) => {
                        console.log("--- Received " + data.length + " Issues");
                        epic.issues = data;
                        epic.issues.forEach((issue) => {
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
        };

        justAlert(myAlert): void {
            if (myAlert == 1) {
                alert("Open Issue in JIRA");
            }
        }
    }
}