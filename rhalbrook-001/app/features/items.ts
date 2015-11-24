module app.domain {
	export interface IItem {
		itemId: number;
		itemName: string;
		description: string;
	}

	export class Item implements IItem {

		constructor(public itemId: number,
					public itemName: string,
					public description: string) {
		}
	}
}