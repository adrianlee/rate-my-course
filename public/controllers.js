CourseRatingSystem = {};

CourseRatingSystem['createUser'] = function(username) {
  var user = new StackMob.User({ username: 'Bruce Wayne', password: 'imbatman', age: 50 });
  user.create(CourseRatingSystem.debugCallback('Creating User: Bruce Wayne'));
};