
"use strict";
app.displayView = Backbone.View.extend({

  initialize: function (options) {
    this.note = options.note;
  },

  // render the template to display the note
  render: function () {
    this.$el.html(_.template($('#showTemplate').html(), this.note.toJSON()));
    return this;
  }
});

