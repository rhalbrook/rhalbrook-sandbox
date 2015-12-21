var sinon, FakeRest;
((): void => {
  var app;
  app = angular.module("itemListBldr", ["ngAnimate", "ngMaterial", "ngMdIcons"]);
  app.service("dataAccessService", services.MockDataAccessService);
  // theme format
  // check with sean on if there is a more typescript way to doing this below code
  app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('orange');
  });
  console.log("finished angular registrations in facade");
 
  // register your controllers / directives here
  app.controller("ItemListCtrl", controllers.ItemListCtrl);


})();