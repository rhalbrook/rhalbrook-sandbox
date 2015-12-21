module interfaces {
	
	export interface Color {
        key: string;
    }

    export interface IEpics {
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
    export interface IIssues {
        id: number;
        self: string;
        key: string;
        fields: Fields;
    }	

	export interface IDataAccessService {
		getEpics(): ng.IPromise<IEpics[]>;
        getIssues(): ng.IPromise<IIssues[]>;
	}

	export interface IItemResource {
	}
}

