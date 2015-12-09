module Consolo.Services {
  
  export interface ISidekiqInfoService {
    getWorkerMetrics: () => ng.IPromise<IWorker[]>;
    getProcessMetrics: () => ng.IPromise<IProcess[]>;  
  }
  
  
    export interface INumberOfCalls {
        success: number;
        failure: number;
        total: number;
    }

    export interface IRuntime {
        last: string;
        max: number;
        min: number;
        average: number;
        total: number;
    }

    export interface IWorker {
        name: string;
        last_job_status: string;
        number_of_calls: INumberOfCalls;
        queue: string;
        runtime: IRuntime;
    }
    
    
    export interface IWorkerStat {
        backlog: number;
        latency: number;
    }

    export interface IQueues {
        billing: IWorkerStat;
        default: IWorkerStat;
        demographics: IWorkerStat;
        historical: IWorkerStat;
        office_copy: IWorkerStat;
        realtime: IWorkerStat;
        reports: IWorkerStat;
        warehouse: IWorkerStat;
    }

    export interface IProcess {
        hostname: string;
        pid: number;
        tag: string;
        started_at: Date;
        queues: string[];
        labels: string[];
        concurrency: number;
        busy: number;
    }
  
 export class SidekiqInfoService implements ISidekiqInfoService {
    public $httpService: ng.IHttpService;
    
    constructor(private $http: ng.IHttpService, private $q : ng.IQService) {
      this.$httpService = $http;
    }
    // static $inject = ["$http"];
    getWorkerMetrics(): ng.IPromise<IWorker[]> {
      var deferred = this.$q.defer();
      //http://www.developerhandbook.com/typescript/writing-angularjs-1-x-with-typescript/
      //https://demo2.consoloservices.com/sidekiq/api/statistic.json?dateFrom=2015-11-06&dateTo=2015-11-07
      //  return ["foo", "bar"];
      this.$httpService.get("http://localhost:3000/cors_proxy?url=https://demo2.consoloservices.com/sidekiq/api/statistic.json?dateFrom=2015-11-06&dateTo=2015-11-07")
      .then(response => {
        deferred.resolve(response.data['workers'] as IWorker[]);
      }).catch( reason => {
        deferred.reject(reason);
      });
      return deferred.promise;
    } 
    
    getProcessMetrics(): ng.IPromise<IProcess[]> {
      var deferred = this.$q.defer();
      //http://www.developerhandbook.com/typescript/writing-angularjs-1-x-with-typescript/
      this.$httpService.get("http://localhost:3000/cors_proxy?url=https://demo2.consoloservices.com/sidekiq/monitor-stats")
      .then(response => {
        deferred.resolve(response.data['processes'] as IProcess[]);
      }).catch( reason => {
        deferred.reject(reason);
      });
      return deferred.promise;
    } 
  }
}
 