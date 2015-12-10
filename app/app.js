var sinon, FakeRest;
(function () {
    var app;
    app = angular.module("itemListBldr", ["ngAnimate", "ngMaterial", "ngMdIcons"]);
    app.service("dataAccessService", services.JiraDataAccessService);
    console.log("finished angular registrations in facade");
    // register your controllers / directives here
    app.controller("ItemListCtrl", controllers.ItemListCtrl);
})();
