var sinon, FakeRest;
((): void => {
  var app;
  app = angular.module("itemListBldr", ["ngAnimate", "ngMaterial", "ngMdIcons"]);
  app.service("dataAccessService", services.JiraDataAccessService);
  // theme format
  app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('orange');
  });
  console.log("finished angular registrations in facade");

  // register your controllers / directives here
  app.controller("ItemListCtrl", controllers.ItemListCtrl);

})();