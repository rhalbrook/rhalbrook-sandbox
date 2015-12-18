module services {

    export class JiraDataAccessService implements interfaces.IDataAccessService {
        public $httpService: ng.IHttpService;

        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
            this.$httpService = $http;
        }
        getEpics(): ng.IPromise<interfaces.IEpic[]> {
            console.log("Inside getEpics");
            var deferred = this.$q.defer();
            this.$httpService.get("http://localhost:3000/cors_proxy?url=https://consolo.atlassian.net/rest/agile/latest/board/11/epic")
                .then(response => {
                    deferred.resolve(response.data['epics'] as interfaces.IEpic[]);
                }).catch(reason => {
                    deferred.reject(reason);
                });
            return deferred.promise;
        }
        
        getIssue(): ng.IPromise<interfaces.IIssue[]> {
            console.log("Inside getIssue");
            var deferred = this.$q.defer();
            this.$httpService.get("http://localhost:3000/cors_proxy?url=https://consolo.atlassian.net/rest/agile/latest/board/11/epic")
                .then(response => {
                    deferred.resolve(response.data['issue'] as interfaces.IIssue[]);
                }).catch(reason => {
                    deferred.reject(reason);
                });
            return deferred.promise;
        }
    }
}