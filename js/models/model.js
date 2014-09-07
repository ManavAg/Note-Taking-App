
"use strict";
app.model = Backbone.Model.extend({
  // The default parameters of the data model
  defaults: {
    title: "New Note",
    description: "",
		created: "",
		edited: "",
  },
	// validate the new note 
	validate: function (attrs) {
    var errors = {};
    if (!attrs.title) errors.title = "Title please!";
    if (!attrs.description) errors.description = "Write a description!";

    if (!_.isEmpty(errors)) {
      return errors;
    }
  }
});

app.collection = Backbone.Collection.extend({
  model: app.model
});
