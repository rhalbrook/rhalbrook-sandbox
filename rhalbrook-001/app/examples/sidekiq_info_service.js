var Consolo;
(function (Consolo) {
    var Services;
    (function (Services) {
        var SidekiqInfoService = (function () {
            function SidekiqInfoService($http, $q) {
                this.$http = $http;
                this.$q = $q;
                this.$httpService = $http;
            }
            // static $inject = ["$http"];
            SidekiqInfoService.prototype.getWorkerMetrics = function () {
                var deferred = this.$q.defer();
                //http://www.developerhandbook.com/typescript/writing-angularjs-1-x-with-typescript/
                //https://demo2.consoloservices.com/sidekiq/api/statistic.json?dateFrom=2015-11-06&dateTo=2015-11-07
                //  return ["foo", "bar"];
                this.$httpService.get("http://localhost:3000/cors_proxy?url=https://demo2.consoloservices.com/sidekiq/api/statistic.json?dateFrom=2015-11-06&dateTo=2015-11-07")
                    .then(function (response) {
                    deferred.resolve(response.data['workers']);
                }).catch(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            };
            SidekiqInfoService.prototype.getProcessMetrics = function () {
                var deferred = this.$q.defer();
                //http://www.developerhandbook.com/typescript/writing-angularjs-1-x-with-typescript/
                this.$httpService.get("http://localhost:3000/cors_proxy?url=https://demo2.consoloservices.com/sidekiq/monitor-stats")
                    .then(function (response) {
                    deferred.resolve(response.data['processes']);
                }).catch(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            };
            return SidekiqInfoService;
        })();
        Services.SidekiqInfoService = SidekiqInfoService;
    })(Services = Consolo.Services || (Consolo.Services = {}));
})(Consolo || (Consolo = {}));
