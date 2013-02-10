var ratemycourse = {};
var App = angular.module('ratemycourse', ['ngResource']);

App.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl : '/templates/home.html',
    controller : HomeCtrl
  });

  $routeProvider.when('/register', {
    templateUrl : '/templates/register.html',
    controller : RegisterCtrl
  });

  $routeProvider.when('/login', {
    templateUrl : '/templates/login.html',
    controller : LoginCtrl
  });

  $routeProvider.when('/logout', {
    templateUrl : '/templates/logout.html',
    controller : LogoutCtrl
  });

$routeProvider.when('/mcgill', {
    templateUrl : '/templates/mcgill.html',
    //controller : McGillCtrl
  });

$routeProvider.when('/concordia', {
    templateUrl : '/templates/concordia.html',
    //controller : ConcordiaCtrl
  });

$routeProvider.when('/udem', {
    templateUrl : '/templates/udem.html',
    //controller : UdemCtrl
  });
  $routeProvider.otherwise({
    redirectTo : '/'
  });
}]);