/*
 *  MAIN
 */

function MainCtrl($scope, $rootScope) {
  $rootScope.$on('logout', function() {
    console.log('HeaderCtrl: Logged Out');
    $scope.isLoggedIn = false;
    $rootScope.user = Parse.User.current();
    $scope.$digest();
  });

  $rootScope.$on('login', function() {  
    console.log('HeaderCtrl: Logged In');
    $scope.isLoggedIn = true;
    $rootScope.user = Parse.User.current();
    $scope.$digest();
  });

  $scope.isLoggedIn = !!Parse.User.current();

  //$scope.user = Parse.User.current();
  $rootScope.user = Parse.User.current();

  $rootScope.isLoggedIn = function () {
    return !!Parse.User.current();
  };
}
MainCtrl.$inject = ['$scope', '$rootScope'];

/*
 *  HEADER
 */
function HeaderCtrl($scope, $rootScope) {
  if ($scope.isLoggedIn) {
    var email = Parse.User.current().attributes.email;
    $scope.email = email;
  }
}
HeaderCtrl.$inject = ['$scope', '$rootScope'];


/*
 *  HOME
 */
function HomeCtrl($scope) {

}
HomeCtrl.$inject = ['$scope'];


/*
 *  REGISTER
 */
function RegisterCtrl($scope, $rootScope, $location) {
  $scope.submit = function(newUser) {
    if (!newUser) {
      return alert("Nothing entered");
    }

    if (newUser.password != newUser.password2) {
      return alert("Password do not match");
    }

    if (newUser.username)

    var user = new Parse.User();
    if ((newUser.username.length) > 32){

      return alert("Username length has to be lower than 32 characters");

    }

    user.set("username", newUser.username);

    if (((newUser.password.length) > 32)|| (newUser.password.length) < 8) {

      return alert("Password length should be between 8 and 32 characters");

    }

    user.set("password", newUser.password);

    if (!newUser.email){

      return alert("Email field left blank");
    }

    if ((newUser.email.length) > 60){

      return alert("Email length has to be lower than 60 characters");
    }

    var patt = /mcgill.ca$/;
    var patt2 = /concordia.ca$/;
    var patt3 = /umontreal.ca$/;

    if ( (!patt.test(newUser.email)) && (!patt2.test(newUser.email)) && (!patt3.test(newUser.email)) ){

      return alert("Please enter a valid university email");
    }

    user.set("email", newUser.email);
    // user.set("first", newUser.first);
    // user.set("last", newUser.last);

    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
        alert('Registration Successful');
        $rootScope.$emit('login');
        $location.path('/');
        $rootScope.$digest();
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        console.log(user);
        console.log(error);
        alert("Error: " + error.code + " " + error.message);
      }
    });
  }
}
RegisterCtrl.$inject = ['$scope', '$rootScope', '$location'];


/*
 *  LOGIN
 */
function LoginCtrl($scope, $rootScope, $location) {
  $scope.submit = function(user) {
    if (!user) {
      return alert("Nothing entered");
    }

    Parse.User.logIn(user.username, user.password, {
      success: function(user) {
        $rootScope.$emit('login');
        $location.path('/').replace();
        $rootScope.$digest();
      },
      error: function(user, error) {
        alert(JSON.stringify(error));
      }
    });
  };
}
LoginCtrl.$inject = ['$scope', '$rootScope', '$location'];



/*
 *  Forgot
 */
function ForgotCtrl($scope, $rootScope, $location) {
  $scope.forgotPass = function (user) {
    console.log(user);
    // reset password reset
    Parse.User.requestPasswordReset(user.email, {
      success: function() {
        // Password reset request was sent successfully
        alert("Reset Password Email Sent");
        // redirect
        $location.path('/login').replace();
      },
      error: function(error) {
        // Show the error message somewhere
        alert("Error: " + error.code + " " + error.message);
      }
    });
  }
}
ForgotCtrl.$inject = ['$scope', '$rootScope', '$location'];




/*
 *  Logout
 */
function LogoutCtrl($scope, $rootScope, $location) {
  $rootScope.$emit('logout');

  Parse.User.logOut();

  if (!Parse.User.current()) {
    $location.path('/').replace();
    $rootScope.$digest();
  };
}
LogoutCtrl.$inject = ['$scope', '$rootScope', '$location'];



/*
 *  Test
 */
function TestCtrl($scope, $rootScope, $location) {

  var user1 = Parse.User.current();
  // var uniqueID = user1.get
  // console.log(user1);

  $scope.submit =function(comment){

    var Comment = Parse.Object.extend("Comment");
    var comment2 = new Comment();
    comment2.set("comment", comment.comment);
    comment2.set("user", user1);

    comment2.save(null, {
      success: function(comment) {
        // The object was saved successfully.
        alert(JSON.stringify(comment));
      },
      error: function(comment, error) {
        // The save failed.
        // error is a Parse.Error with an error code and description.
        alert(JSON.stringify(comment));
        alert(JSON.stringify(error));
      }
    });
 }
}
TestCtrl.$inject = ['$scope', '$rootScope', '$location'];



/*
 *  Create Course
 */
function CreateCourseCtrl($scope) {
  var current_user = Parse.User.current();

  console.log("test");

  $scope.submit = function(form) {
    // Validation Login

    // Check if form is filled
    if (!form) {
      return alert('form is empty');
    }

    else if (!form.courseTitle) {
      return alert ("Please enter a course title");
      //return $scope.hello = "Please enter a course title\n";
    }

    else if (!form.courseCode) {
      return alert ("Please enter a course code");
    }

    else if (!form.courseNumber) {
        return alert ("Please enter a course number");

    }

    // Uppercase course code
    if (form.courseCode && typeof form.courseCode == "string") {
      form.courseCode = form.courseCode.toUpperCase();
    }

    // todo: Check if form.courseCode is a number

    // todo: Transform form.courseTitle to have capitalization on each word


    // Create Courses Object, Set Fields, Save.
    var Courses = Parse.Object.extend("Courses");
    var course = new Courses();
    course.set("university", form.university);
    course.set("title", form.courseTitle);
    course.set("code", form.courseCode);
    course.set("number", form.courseNumber);
    course.set("createdBy", current_user);

    var keywords = [];
    keywords.push(form.courseCode + form.courseNumber);
    keywords.push(form.courseCode + " " + form.courseNumber);
    course.set("keywords", keywords);

    course.save(null, {
      success: function(comment) {
        // The object was saved successfully.
        alert(JSON.stringify(comment));
      },
      error: function(comment, error) {
        // The save failed.
        // error is a Parse.Error with an error code and description.
        alert(JSON.stringify(comment));
        alert(JSON.stringify(error));
      }
    });
 }
}
CreateCourseCtrl.$inject = ['$scope'];

/*
 *  University
 */
function UniversityCtrl($scope, $location) {
  console.log($location.path());

  var Courses = Parse.Object.extend("Courses");

  var query = new Parse.Query(Courses);

  query.equalTo("university", $location.path().substring(1));

  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length + " courses.");

      var jsonArray = [];

      for (var i = 0; i < results.length; i++) {
        jsonArray.push(results[i].toJSON());
      }

      console.log(jsonArray);

      $scope.courses = jsonArray;

      $scope.$digest();
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}
UniversityCtrl.$inject = ['$scope', '$location'];


/*
 *  Courses
 */
function CoursesCtrl($scope, $location, $routeParams) {
  var course;
  // init
  $scope.form = {
    term: "w2013"
  };

  $scope.submitRating = function (form) {
    form.course_rating = $('#rate_course').raty('score');
    form.prof_rating = $('#rate_prof').raty('score');

    var Ratings = Parse.Object.extend("Ratings");
    var rating = new Ratings();

    if (!form.professor) {
      return alert("Please enter a professor name");
    }

    if(form.comments.length > 1000){
      return alert ("Please enter comments under 1000 characters in length");
    }

    rating.set("professor", form.professor);
    rating.set("comments", form.comments);
    rating.set("term", form.term);
    rating.set("course_rating", form.course_rating);
    rating.set("prof_rating", form.prof_rating);
    rating.set("createdBy", Parse.User.current());
    rating.set("course", $routeParams.courseid);

    rating.save(null, {
      success: function(rating) {
        // The object was saved successfully.
        console.log(rating);
        window.location.reload();
      },
      error: function(rating, error) {
        // The save failed.
        // error is a Parse.Error with an error code and description.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  };

  // query
  console.log($location.path());
  console.log($routeParams);

  var Courses = Parse.Object.extend("Courses");
  var query = new Parse.Query(Courses);
  query.equalTo("objectId", $routeParams.courseid);
  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length + " course.");
      console.log(results[0].toJSON());
      course = results[0];
      $scope.course = results[0].toJSON();
      $scope.$digest();
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });

  var Ratings = Parse.Object.extend("Ratings");
  var query2 = new Parse.Query(Ratings);
  query2.equalTo("course", $routeParams.courseid);
  query2.include("createdBy");
  query2.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length + " ratings.");
      console.log(results);

      var jsonArray = [];

      for (var i = 0; i < results.length; i++) {
        var rating = results[i].toJSON();
        rating.createdBy = results[i].attributes.createdBy.toJSON();
        rating.image = 'http://www.gravatar.com/avatar/' + md5(results[i].attributes.createdBy.attributes.email.toLowerCase().trim());
        rating.timestamp = new Date(results[i].createdAt);
        jsonArray.push(rating);
      }

      $scope.ratings = jsonArray;
      $scope.$digest();
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });

}
CoursesCtrl.$inject = ['$scope', '$location', '$routeParams'];

/*
 *  Rating
 */
// function RatingCtrl($scope, $routeParams) {
//   console.log("RatingCtrl");
// }
// RatingCtrl.$inject = ['$scope', '$routeParams']