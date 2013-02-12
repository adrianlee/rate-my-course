
/*
 *  MAIN
 */

function MainCtrl($scope, $rootScope) {
  $rootScope.$on('logout', function() {
    console.log('HeaderCtrl: Logged Out');
    $scope.isLoggedIn = false;
  });

  $rootScope.$on('login', function() {
    console.log('HeaderCtrl: Logged In');
    $scope.isLoggedIn = true;
  });

  $scope.isLoggedIn = !!Parse.User.current();
}
MainCtrl.$inject = ['$scope', '$rootScope'];

/*
 *  HEADER
 */

function HeaderCtrl($scope) {
  if ($scope.isLoggedIn) {
    console.log(Parse.User.current().attributes.email);
    var user = Parse.User.current();
    console.log(user.attributes);
    $scope.email = user;
  }
}
HeaderCtrl.$inject = ['$scope'];


/*
 *  HOME
 */

function HomeCtrl($scope) {
  $scope.title = "omg"
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
        window.location.hash = "/";
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
        $location.path('/');
        $location.path('/').replace();
        $location.path('/');
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
  };
}
LogoutCtrl.$inject = ['$scope', '$rootScope', '$location'];



/*
 *  Test
 */

function TestCtrl($scope, $rootScope, $location) {

  var user1= Parse.User.current();
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




