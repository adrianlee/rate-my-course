var HomeView = Backbone.View.extend({

  el: '#main',

  initialize: function() {
    this.template = _.template($('#item-home').html());
    this.render();
  },

  render: function() {

    var el = this.$el;

    el.empty();
    el.append(this.template());

    // var listView = new ListView({collection:wines});
    // $('.span4').append(listView.render().el);

    return this;
  }

});

var LoginView = Backbone.View.extend({

  el: '#main',

  initialize: function() {
    this.template = _.template($('#item-login').html());
    this.render();
  },

  render: function() {

    var el = this.$el;

    el.empty();
    el.append(this.template());

    // var listView = new ListView({collection:wines});
    // $('.span4').append(listView.render().el);

    return this;
  },

  events: {
    "click .submit": "submit"
  },

  submit: function () {
    var self = this;
    console.log("LOGIN!");
    Parse.User.logIn("adrian", "123", {
      success: function(user) {
        // Do stuff after successful login.
        self.render();
        App.navigate('/', true);
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
      }
    });
  }

});

var RegisterView = Backbone.View.extend({

  el: '#main',

  initialize: function() {
    this.template = _.template($('#item-register').html());
    this.render();
  },

  render: function() {

    var el = this.$el;

    el.empty();
    el.append(this.template());

    // var listView = new ListView({collection:wines});
    // $('.span4').append(listView.render().el);

    return this;
  },

  events: {
    "click .submit": "submit"
  },

  submit: function () {
    console.log("REGISTER!");
    var user = new Parse.User();

    user.set("username", "adrian");
    user.set("password", "123");
    user.set("email", "jun.irok@gmail.com");

    user.signUp(null, {
      success: function(user) {
        console.log("hurray");
        // Hooray! Let them use the app now.
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  }
});