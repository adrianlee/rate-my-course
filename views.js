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
  }

});