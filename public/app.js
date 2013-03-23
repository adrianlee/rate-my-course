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

  $routeProvider.when('/profile', {
    templateUrl : '/templates/profile.html',
    controller : EditCtrl
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

    var my_input = _.compact(_.uniq(input));

    if (my_input) {
      if (my_input.length > 3) {
        return (my_input[0] || "") + " " + (my_input[1] || "") + " " + (my_input[2] || "") + " ...";
      } else if (my_input.length = 3) {
        return (my_input[0] || "") + " " + (my_input[1] || "") + " " + (my_input[2] || "");
      } else if (my_input.length = 2) {
        return (my_input[0] || "") + " " + (my_input[1] || "");
      } else if (my_input.length = 1) {
        return (my_input[0] || "");
      } else {
        return;
      }
    } else {
      return;
    }
  }
});