module controllers {
	export interface ItemListModel {
		title: string;
		epics: interfaces.IEpic[];
	} 

	export class ItemListCtrl implements ItemListModel {
		title: string;
		epics: interfaces.IEpic[];
		private _search: string;

		get search():string {
        	return this._search;
    	}
    	set search(theSearch:string) {
			console.log("search: " + theSearch);
        	this._search = theSearch;
    	}
		public $myService:interfaces.IDataAccessService;

		static $inject=["dataAccessService"];
 
		constructor(private dataAccessService: interfaces.IDataAccessService) {
			this.title = "JIRA Filtered Views";
			this.epics = [];
			console.log("inside ItemListCtrl constructor!");
			
			this.$myService = dataAccessService;
			
			this.$myService.getEpics().then((data:interfaces.IEpic[]) => {
				console.log("received " + data.length + " Epics in response.");
				this.epics = data;
			}, (err) => {
				console.error(err);
			});
		};
	}	
}