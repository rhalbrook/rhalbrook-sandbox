module interfaces {
	
	export interface Color {
        key: string;
    }

    export interface IEpic {
        id: number;
        key: string;
        self: string;
        name: string;
        summary: string;
        color: Color;
        done: boolean;
    }	

	export interface IDataAccessService {
		getEpics(): ng.IPromise<IEpic[]>;
	}

	export interface IItemResource {
	}
}

