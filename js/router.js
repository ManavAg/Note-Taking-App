"use strict";
window.app = window.app || {};
app.router = Backbone.Router.extend({
  // Define all routes
	routes: {
		"": "index",
    "notes/index": "index",
    "note/new": "create",
    "note/:id/edit": "edit",
    "note/:id/view": "show"
  },
	
	// Set initial parameters and output notes index
  initialize: function (options) {
    this.notes = options.notes;
    this.index();
  },
	
	// Renders List of all the notes stored in JSON
	index: function () {
		this.currentView = new app.indexView({
      notes: this.notes,
    });
    $('#content').html(this.currentView.render().el);
  },
	
	// renders new note creation form
  create: function () {
    this.currentView = new app.editView({
      notes: this.notes, note: new app.model()
    });

    $('#content').html(this.currentView.render().el);
  },
	
	// renders edit note form
  edit: function (id) {
    var note = this.notes.get(id);
    this.currentView = new app.editView({
      notes: this.notes, note: note
    });
    $('#content').html(this.currentView.render().el);
  },
	
	//renders display note
  show: function (id) {
    var note = this.notes.get(id);
    this.currentView = new app.displayView({
      note: note
    });
    $('#content').html(this.currentView.render().el);
  }
});
