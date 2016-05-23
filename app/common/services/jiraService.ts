module services {

    export class JiraDataAccessService implements interfaces.IDataAccessService {
        public $httpService: ng.IHttpService;

        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
            this.$httpService = $http;
        }
        getEpics(): ng.IPromise<interfaces.IEpic[]> {
            //console.log("Inside getEpics");
            var deferred = this.$q.defer();
            this.$httpService.get("http://localhost:3000/cors_proxy?url=https://jira.consoloservices.com/rest/agile/latest/board/11/epic?done=false")
                .then(response => {
                    deferred.resolve(response.data['values'] as interfaces.IEpic[]);
                }).catch(reason => {
                    deferred.reject(reason);
                });
                //console.log("Leaving getEpics");
            return deferred.promise;
        }

        getIssues(epicId): ng.IPromise<interfaces.IIssue[]> {
            //console.log("Inside getIssues");
            var deferred = this.$q.defer();
            this.$httpService.get("http://localhost:3000/cors_proxy?url=https://jira.consoloservices.com/rest/agile/latest/board/11/epic/" + epicId + "/issue?maxResults=10000")
                .then(response => {
                    deferred.resolve(response.data['issues'] as interfaces.IIssue[]);
                }).catch(reason => {
                    deferred.reject(reason);
                });
                //console.log("Leaving getIssues");
            return deferred.promise;
        }

        getSprints(): ng.IPromise<interfaces.ISprint[]> {
            //console.log("Inside getSprints");
            var deferred = this.$q.defer();
            this.$httpService.get("http://localhost:3000/cors_proxy?url=https://jira.consoloservices.com/rest/agile/latest/board/11/sprint")
                .then(response => {
                    deferred.resolve(response.data['values'] as interfaces.ISprint[]);
                }).catch(reason => {
                    deferred.reject(reason);
                });
                //console.log("Leaving getSprints");
            return deferred.promise;
        }
    }
}