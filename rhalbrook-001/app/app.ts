var sinon, FakeRest;
((): void => {
  var app;
  app = angular.module("itemListBldr", ["ngAnimate"]);
  app.service("dataAccessService", services.MyDataAccessService);
  
  console.log("finished angular registrations in facade");
 
  // register your controllers / directives here
  app.controller("ItemListCtrl", controllers.ItemListCtrl);
  

})();