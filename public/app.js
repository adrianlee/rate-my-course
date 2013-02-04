(function($){
  AppRouter = Backbone.Router.extend({
    routes:{
      "": "home",
      "!/register": "register",
      "register": "register",
      "!/login": "login"
    },

    home: function() {
      new HomeView();
    },

    register: function() {
      new RegisterView();
    },

    login: function() {
      new LoginView();
    }
  });
}(jQuery));
