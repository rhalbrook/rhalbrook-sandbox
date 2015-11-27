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
		items: interfaces.ITask[];

		static $inject=["dataAccessService"];
 
 		// NOTE: you MUST use the interface here, or your class is tightly-coupled to a specific service class
		constructor(private dataAccessService: interfaces.IDataAccessService) {
			this.title = "Things to Learn";
			this.items = [];
			console.log("inside ItemListCtrl constructor!");
			
			dataAccessService.getTasks().then((data) => {
				var arr = data as interfaces.ITask[];
				console.log("received " + arr.length + " Tasks in response.");
				this.items = arr;
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
			//alert(this.newItem);
			if (this.newItem) {
				this.items.push(this.newItem);
				this.newItem = null;
			}
			else {
				//alert("Uh Uh Uh...No DATA entered");
			}

		}
		cancelNewItem(): void {
			this.newItem = null;
		}
		deleteItem(delItem): void {
			//alert(delItem);				
			var index = -1;
			for (var i = 0; i < this.items.length; i++) {
				if (this.items[i].id === delItem) {
					index = i;
					break;
				}
			}
			if (index === -1) {
				alert("Something gone wrong");
			}
			this.items.splice(index, 1);
		};
	}
	// var app = angular.module("itemListBldr");
	
}