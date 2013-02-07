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

function HeaderCtrl($scope) {
  console.log(Parse.User.current().attributes.email);
  var user = Parse.User.current();
  console.log(user.attributes);
  $scope.email = user;
}
HeaderCtrl.$inject = ['$scope'];


function HomeCtrl($scope) {
  $scope.title = "omg"
}
HomeCtrl.$inject = ['$scope'];

function RegisterCtrl($scope) {
  $scope.submit = function(newUser) {
    if (!newUser) {
      return alert("Nothing entered");
    }

    if (newUser.password != newUser.password2) {
      return alert("Password do not match");
    }
    var user = new Parse.User();
    user.set("username", newUser.username);
    user.set("password", newUser.password);
    user.set("email", newUser.email);
    // user.set("first", newUser.first);
    // user.set("last", newUser.last);

    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
        alert("yay!")
        console.log(user);
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
RegisterCtrl.$inject = ['$scope'];

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

function LogoutCtrl($scope, $rootScope, $location) {
  $rootScope.$emit('logout');

  Parse.User.logOut();

  if (!Parse.User.current()) {
    $location.path('/').replace();
  };
}
LogoutCtrl.$inject = ['$scope', '$rootScope', '$location'];

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




