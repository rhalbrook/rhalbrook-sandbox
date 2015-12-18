module controllers {
	export interface ItemListModel {
		title: string;
		epics: interfaces.IEpic[];
		issues: interfaces.IIssue[];
		justAlert(myAlert): void;
	}

	export class ItemListCtrl implements ItemListModel {
		title: string;
		epics: interfaces.IEpic[];
		issues: interfaces.IIssue[];
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

			this.$myService.getEpics().then((data: interfaces.IEpic[]) => {
				console.log("received " + data.length + " Epics in response.");
				this.epics = data;
			}, (err) => {
				console.error(err);
			});

			this.$myService.getIssue().then((data: interfaces.IIssue[]) => {
				console.log("received " + data.length + " Issues in response.");
				this.issues = data;
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