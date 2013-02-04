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
    console.log("LOGIN!");
    var user = new StackMob.User({ username: 'adrian', password: '123' });

    user.login(false, {
      success: function(model) {
        console.log("success");
      },
      error: function(model, response) {
        console.log("error");
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
    var user = new StackMob.User({ username: 'adrian', password: '123', email: 'jun.irok@gmail.com' });

    user.create();
  }
});