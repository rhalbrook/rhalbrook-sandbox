module interfaces {
	// NOTE: you can take json and generate some TS Interfaces for the data
	// using an online tool at: http://json2ts.com/.  Typically requires some tweaking after the fact
	// but can still be a time-saver.
	export interface ITask {
		id: number;
		itemId: number;
		itemName: string;
		description: string;
		createdAt: Date;
		updatedAt: Date;
	}

	export interface IFoo {
		id: number;
		name: string;
	}

	export interface IDataAccessService {
		getTasks(): ng.IPromise<ITask[]>;
		addTask(obj:ITask): ng.IPromise<ITask>;
		deleteTask(obj:ITask): ng.IPromise<void>;
		updateTask(obj:ITask): ng.IPromise<ITask>;
	}

	export interface IItemResource {
	}
	// export interface IItemResource extends ng.resource.IResource<app.domain.IItem> {
	// }
}

