"use strict";
app.rowView = Backbone.View.extend({
  tagName: "tr",
  
	events: {
    "click a.delete": "destroy"
  },

  initialize: function (options) {
    this.note  = options.note;
    this.notes = options.notes;
  },

  // render the template of each row
  render: function () {
    this.$el.html(_.template($('#rowTemplate').html(), this.note.toJSON()));
    return this;
  },

  // delete a single note
  destroy: function (event) {
    event.preventDefault();
    event.stopPropagation();
    this.notes.remove(this.note);
    this.$el.remove();
  }
});
