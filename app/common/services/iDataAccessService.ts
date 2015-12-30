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
        issues: interfaces.IIssues[];
        Total: number;
        Blocked: number;
        Open: number;
        inProgress: number;
        readyToTest: number;
        passedTests: number;
        Closed: number;
    }
    
    export interface Fields{
        summary: string;
        cuctomfield_10008: string;
        status: Status;
    }
    interface Status {
        id: string;
        name: string;
    }
    export interface IIssues {
        id: number;
        self: string;
        key: string;
        fields: Fields;
    }	

	export interface IDataAccessService {
		getEpics(): ng.IPromise<IEpics[]>;
        getIssues(epicId): ng.IPromise<IIssues[]>;
	}

	export interface IItemResource {
	}
}

