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

  $routeProvider.when('/create', {
    templateUrl : '/templates/create.html',
    controller: CreateCourseCtrl
  });

  $routeProvider.when('/forgot', {
    templateUrl : '/templates/forgot.html',
    controller : ForgotCtrl
  });

  $routeProvider.when('/courses/:courseid', {
    templateUrl : '/templates/courses.html',
    controller : CoursesCtrl
  });

  $routeProvider.when('/users', {
    templateUrl : '/templates/users.html',
    controller : UsersCtrl
  });
  // $routeProvider.when('/courses/:courseid/create', {
  //   templateUrl : '/templates/rating.html',
  //   controller : RatingCtrl
  // });

  $routeProvider.when('/mcgill', {
    templateUrl : '/templates/universities/mcgill.html',
    controller: UniversityCtrl
  });

  $routeProvider.when('/concordia', {
    templateUrl : '/templates/universities/concordia.html',
    controller: UniversityCtrl
  });

  $routeProvider.when('/udem', {
    templateUrl : '/templates/universities/udem.html',
    controller: UniversityCtrl
  });

  $routeProvider.otherwise({
    redirectTo : '/'
  });
}]);


App.filter('capitalize', function() {
  return function(input, scope) {
    if (input){
      return input.substring(0,1).toUpperCase()+input.substring(1);
    } else {
      return;
    }
  }
});

App.filter('professor_list3', function() {
  return function(input, scope) {
    console.log(input);
    if (input) {
      if (input.length > 3) {
        return (input[0] || "") + " " + (input[1] || "") + " " + (input[2] || "") + "...";
      } else if (input.length = 3) {
        return (input[0] || "") + " " + (input[1] || "") + " " + (input[2] || "");
      } else if (input.length = 2) {
        return (input[0] || "") + " " + (input[1] || "");
      } else if (input.length = 1) {
        return (input[0] || "");
      } else {
        return;
      }
    } else {
      return;
    }
  }
});