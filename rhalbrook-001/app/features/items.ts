module app.domain {
	export interface NItem {
		itemId: number;
		itemName: string;
		description: string;
	}

	export class NewItem implements NItem {

		constructor(public itemId: number,
					public itemName: string,
					public description: string) {
		}
	}
}