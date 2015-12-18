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
    
    export interface Fields{
        summary: string;
        cuctomfield_10008: string;
    }
    export interface IIssue {
        id: number;
        self: string;
        key: string;
        fields: Fields;
    }	

	export interface IDataAccessService {
		getEpics(): ng.IPromise<IEpic[]>;
        getIssue(): ng.IPromise<IIssue[]>;
	}

	export interface IItemResource {
	}
}

