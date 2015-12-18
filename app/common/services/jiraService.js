var services;
(function (services) {
    var JiraDataAccessService = (function () {
        function JiraDataAccessService($http, $q) {
            this.$http = $http;
            this.$q = $q;
            this.$httpService = $http;
        }
        JiraDataAccessService.prototype.getEpics = function () {
            console.log("Inside getEpics");
            var deferred = this.$q.defer();
            this.$httpService.get("http://localhost:3000/cors_proxy?url=https://consolo.atlassian.net/rest/agile/latest/board/11/epic")
                .then(function (response) {
                deferred.resolve(response.data['epics']);
            }).catch(function (reason) {
                deferred.reject(reason);
            });
            return deferred.promise;
        };
        JiraDataAccessService.prototype.getIssue = function () {
            console.log("Inside getIssue");
            var deferred = this.$q.defer();
            this.$httpService.get("http://localhost:3000/cors_proxy?url=https://consolo.atlassian.net/rest/agile/latest/board/11/epic")
                .then(function (response) {
                deferred.resolve(response.data['issue']);
            }).catch(function (reason) {
                deferred.reject(reason);
            });
            return deferred.promise;
        };
        return JiraDataAccessService;
    })();
    services.JiraDataAccessService = JiraDataAccessService;
})(services || (services = {}));
