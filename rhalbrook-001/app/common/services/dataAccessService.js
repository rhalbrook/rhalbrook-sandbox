var app;
(function (app) {
    var common;
    (function (common) {
        var DataAccessService = (function () {
            function DataAccessService($resource) {
                this.$resource = $resource;
            }
            DataAccessService.prototype.getItemResource = function () {
                return this.$resource("/api/items/:itemId");
            };
            DataAccessService.$inject = ["$resource"];
            return DataAccessService;
        })();
        common.DataAccessService = DataAccessService;
        angular
            .module("common.services")
            .service("dataAccessService", DataAccessService);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
