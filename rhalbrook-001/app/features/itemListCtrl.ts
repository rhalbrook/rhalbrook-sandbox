module app.itemList {
	interface ItemListModel {
		title: string;
		items: app.domain.IItem[];
		addNewItem(): void;
		cancelNewItem(): void;
		deleteItem(delItem): void;
	}

	class ItemListCtrl implements ItemListModel {
		title: string;
		newItem: app.domain.IItem;
		items: app.domain.IItem[];

		static $inject=["dataAccessService"];
		constructor(private dataAccessService: app.common.DataAccessService) {
			this.title = "Things to Learn";
			this.items = [];
			
			var itemResource = dataAccessService.getItemResource();
			itemResource.query((data: app.domain.IItem[]) => {
				this.items = data;
			})
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
				if (this.items[i].itemId === delItem) {
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
	angular
		.module("itemListBldr")
		.controller("ItemListCtrl",
		ItemListCtrl);
}