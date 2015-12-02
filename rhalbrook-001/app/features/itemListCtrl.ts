module controllers {
	// NOTE: take a look at this http://stackoverflow.com/questions/30176289/using-external-modules-in-typescript/30176523#30176523
	export interface ItemListModel {
		title: string;
		items: interfaces.ITask[];
		addNewItem(): void;
		cancelNewItem(): void;
		deleteItem(delItem): void;
	}

	export class ItemListCtrl implements ItemListModel {
		title: string;
		newItem: interfaces.ITask;
		delItem: interfaces.ITask;
		items: interfaces.ITask[];
		public $myService:interfaces.IDataAccessService;

		static $inject=["dataAccessService"];
 
 		// NOTE: you MUST use the interface here, or your class is tightly-coupled to a specific service class
		constructor(private dataAccessService: interfaces.IDataAccessService) {
			this.title = "Ralph's list of things to learn";
			this.items = [];
			console.log("inside ItemListCtrl constructor!");
			
			this.$myService = dataAccessService;
			
			this.$myService.getTasks().then((data) => {
				var arr = data as interfaces.ITask[];
				console.log("received " + arr.length + " Tasks in response.");
				this.items = arr;
			}, (err) => {
				this.items = [];
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
			alert(delItem);
			this.$myService.deleteTask(delItem).then((data) => {
				// rh: Not sure if this is the way that you do this.  
				// rh: I've been researching it but I can't seem to find anything.
				// rh: My console says that I'm getting into the Delete Method ("deleting one task...")
				// hr: But it is erroring out on the "deferred.resolve(JSON.parse(req.responseText));"
				// hr: So that just tells me that I am trying to send the data to the method incorrectly 
				this.items.splice(data); 
				this.newItem = null;			
			}, (err) => {
				console.error(err);
			})

		};
	}
	//  var app = angular.module("itemListBldr");
	
}