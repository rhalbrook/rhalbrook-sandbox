var services;
(function (services) {
    var WayWayMockService = (function () {
        //public $httpService: ng.IHttpService;
        function WayWayMockService($http, $q) {
            this.$http = $http;
            this.$q = $q;
            // do nothing for now
        }
        WayWayMockService.prototype.getTasks = function () {
            var deferred = this.$q.defer();
            var fakeResults = [
                {
                    id: 1,
                    itemName: "foo",
                    description: "some description"
                }
            ];
            setTimeout(function () {
                deferred.resolve(fakeResults);
            }, 1000);
            return deferred.promise;
        };
        // FIXME: method needs implementation (use getTasks as example)  hint: requires http method POST
        WayWayMockService.prototype.addTask = function (obj) {
            var deferred = this.$q.defer();
            return deferred.promise;
        };
        // FIXME: method needs implementation (use getTasks as example)  hint: requires http method DESTROY or DELETE
        WayWayMockService.prototype.deleteTask = function (obj) {
            var deferred = this.$q.defer();
            return deferred.promise;
        };
        // FIXME: method needs implementation (use getTasks as example)  hint: requires http method PUT
        WayWayMockService.prototype.updateTask = function (obj) {
            var deferred = this.$q.defer();
            return deferred.promise;
        };
        return WayWayMockService;
    })();
    services.WayWayMockService = WayWayMockService;
})(services || (services = {}));
