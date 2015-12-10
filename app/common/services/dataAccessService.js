var common;
(function (common) {
    var services;
    (function (services) {
        var DataAccessService = (function () {
            function DataAccessService($resource) {
                this.$resource = $resource;
            }
            DataAccessService.prototype.getItemResource = function () {
                return this.$resource("/api/epics/:id");
            };
            DataAccessService.$inject = ["$resource"];
            return DataAccessService;
        })();
        services.DataAccessService = DataAccessService;
    })(services = common.services || (common.services = {}));
})(common || (common = {}));
