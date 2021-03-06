'use strict';

// App Module: the name RobinsNestStore matches the ng-app attribute in the main <html> tag
// the route provides parses the URL and injects the appropriate partial page
var storeApp = angular.module('RobinsNestStore', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/store', {
        templateUrl: 'partials/store.htm',
        controller: storeController 
      }).
      when('/products/:productSku', {
        templateUrl: 'partials/product.htm',
        controller: storeController
      }).
      when('/transaction/:transactionId', {
        templateUrl: 'partials/transaction.htm',
        controller:storeController
      }).
      when('/cart', {
        templateUrl: 'partials/shoppingCart.htm',
        controller: storeController
      }).
      when('/orders', {
        templateUrl: 'partials/orders.htm',
        controller: storeController
      }).
      when('/addproduct', {
        templateUrl: 'partials/addproduct.htm',
        controller: storeController
      }).
      otherwise({
        redirectTo: '/store'
      });
}]);

// create a data service that provides a store and a shopping cart that
// will be shared by all views (instead of creating fresh ones for each view).
storeApp.factory("DataService", function () {

    // create store
    var myStore = new store();

    // create shopping cart
    var myCart = new shoppingCart("RobinsNestStore");

    // create orders
    var myOrders = new orders();
    // enable PayPal checkout
    // note: the second parameter identifies the merchant; in order to use the 
    // shopping cart with PayPal, you have to create a merchant account with 
    // PayPal. You can do that here:
    // https://www.paypal.com/webapps/mpp/merchant
    myCart.addCheckoutParameters("PayPal", "harpalikli-facilitator@hotmail.com");


    // return data object with store and cart
    return {
        store: myStore,
        cart: myCart,
        orders: myOrders
    };
});