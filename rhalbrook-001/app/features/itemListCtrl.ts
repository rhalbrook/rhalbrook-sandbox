module controllers {
	// NOTE: take a look at this http://stackoverflow.com/questions/30176289/using-external-modules-in-typescript/30176523#30176523
	export interface ItemListModel {
		title: string;
		items: interfaces.ITask[];
		addNewItem(): void;
		cancelNewItem(): void;
		deleteItem(delItem): void;
		editItem(edItem): void;
		justAlert(myAlert): void;
		openMenu($mdOpenMenu, ev): void;
	} 

	export class ItemListCtrl implements ItemListModel {
		title: string;
		newItem: interfaces.ITask;
		delItem: interfaces.ITask;
		edItem: interfaces.ITask;
		items: interfaces.ITask[];
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
 
 		// NOTE: you MUST use the interface here, or your class is tightly-coupled to a specific service class
		constructor(private dataAccessService: interfaces.IDataAccessService) {
			this.title = "Ralph's list of things to learn";
			this.items = [];
			console.log("inside ItemListCtrl constructor!");
			
			this.$myService = dataAccessService;
			
			this.$myService.getTasks().then((data:interfaces.ITask[]) => {
				console.log("received " + data.length + " Tasks in response.");
				this.items = data;
			}, (err) => {
				console.error(err);
			});
			
			// The following lines I commented out are probably best done in the service class, imo
			// var itemResource = dataAccessService.getItemResource();
			// itemResource.query((data: app.domain.IItem[]) => {
			// 	this.items = data;
			// });
		};
		addNewItem(): void {
			this.$myService.addTask(this.newItem).then((data) => {
				this.items.push(data);
				this.newItem = null;
			}, (err) => {
				console.error(err);
			})
		}
		cancelNewItem(): void {
			this.newItem = null;
		}
		deleteItem(delItem): void {
			this.$myService.deleteTask(delItem).then((data) => {
				var index = this.items.indexOf(delItem);
				this.items.splice(index, 1); 
				this.delItem = null;			
			}, (err) => {
				console.error(err);
			})
		}
		editItem(edItem):void {
			console.log("Starting Edit...");
			this.$myService.updateTask(edItem).then((data) => {
				var index = this.items.indexOf(edItem);
				console.log("I'm Back");
				this.edItem = null;			
			}, (err) => {
				console.error(err);
			})			
		}
		justAlert(myAlert): void{
			if(myAlert==1){
				alert("This will have categories soon :)");
			}
		}
		openMenu($mdOpenMenu, ev) {
			var originatorEv;
			originatorEv = ev;
			$mdOpenMenu(ev);
		}
	}
	//  var app = angular.module("itemListBldr");
	
}