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

            this.$myService.getEpics().then((data: interfaces.IEpics[]) => {
                console.log("received " + data.length + " Epics in response.");
                this.epics = data;              
                // START EPIC LOOP
                for (var key in this.epics) {
                    // GET ISSUES    
                    this.$myService.getIssues(this.epics[key].id).then((data: interfaces.IIssues[]) => {
                        console.log("received " + data.length + " Issues in response.");
                        this.issues = data; 
                    }, (err) => {
                        console.error(err);
                    });
                    // END OF GET ISSUES   
                }
                // END EPIC LOOP
            }, (err) => {
                console.error(err);
            });
        };
        justAlert(myAlert): void {
            if (myAlert == 1) {
                alert("Open Issue in JIRA");
            }
        }
    }
}