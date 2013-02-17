var ratemycourse = {};
var App = angular.module('ratemycourse', ['ngResource']);

// Allow usage of back button
App.config(['$locationProvider', function($locationProvider) {
  // $locationProvider.html5Mode(true);
  // $locationProvider.hashPrefix('#');
}]);

// Router
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
    controller: UniversityCtrl
  });

  $routeProvider.when('/create', {
    templateUrl : '/templates/create.html',
    controller: CreateCourseCtrl
  });

  $routeProvider.when('/forgot', {
    templateUrl : '/templates/forgot.html',
    controller : ForgotCtrl
  });

  $routeProvider.when('/concordia', {
    templateUrl : '/templates/concordia.html',
    controller: UniversityCtrl
  });

  $routeProvider.when('/udem', {
    templateUrl : '/templates/udem.html',
    controller: UniversityCtrl
  });

  $routeProvider.otherwise({
    redirectTo : '/'
  });
}]);