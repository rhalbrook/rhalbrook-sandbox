module services {

    export class JiraDataAccessService implements interfaces.IDataAccessService {
        public $httpService: ng.IHttpService;

        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
            this.$httpService = $http;
        }
        getEpics(): ng.IPromise<interfaces.IEpics[]> {
            //console.log("Inside getEpics");
            var deferred = this.$q.defer();
            this.$httpService.get("http://localhost:3000/cors_proxy?url=https://consolo.atlassian.net/rest/agile/latest/board/11/epic?done=false")
                .then(response => {
                    deferred.resolve(response.data['values'] as interfaces.IEpics[]);
                }).catch(reason => {
                    deferred.reject(reason);
                });
                //console.log("Leaving getEpics");
            return deferred.promise;
        }
        
        // STILL HAVE TO WORK THROUGH GETTING THE ISSUES FOR A SPECIFIC EPIC
        getIssues(epicId): ng.IPromise<interfaces.IIssues[]> {
            //console.log("Inside getIssues");
            var deferred = this.$q.defer();
            this.$httpService.get("http://localhost:3000/cors_proxy?url=https://consolo.atlassian.net/rest/agile/latest/board/11/epic/" + epicId + "/issue?maxResults=10000")
                .then(response => {
                    deferred.resolve(response.data['issues'] as interfaces.IIssues[]);
                }).catch(reason => {
                    deferred.reject(reason);
                });
                //console.log("Leaving getIssues");
            return deferred.promise;
        }
    }
}