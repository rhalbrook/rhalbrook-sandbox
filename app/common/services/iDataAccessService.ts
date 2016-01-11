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
        issues: interfaces.IIssue[];
        Total: number;
        Blocked: number;
        Open: number;
        inProgress: number;
        readyToTest: number;
        passedTests: number;
        Closed: number;
    }

    export interface Fields {
        summary: string;
        cuctomfield_10008: string;
        status: Status;
        sprint: Sprint;
    }
    interface Status {
        id: string;
        name: string;
    }
    interface Sprint {
        id: number;
        name: string;
    }
    export interface IIssue {
        id: number;
        self: string;
        key: string;
        fields: Fields;
    }

    export interface ISprint {
        id: number;
        self: string;
        state: string;
        name: string;
        startDate: Date;
        endDate: Date;
        completeDate: Date;
        originBoardId: number;
    }

    export interface IDataAccessService {
        getEpics(): ng.IPromise<IEpic[]>;
        getIssues(epicId): ng.IPromise<IIssue[]>;
        getSprints(): ng.IPromise<ISprint[]>;
    }

    export interface IItemResource {
    }
}

