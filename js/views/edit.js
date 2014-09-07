
"use strict";
app.editView = Backbone.View.extend({
  events: {
    "click button.save": "save"
  },

  // Initialize the parameters to be used with values from collection model
  initialize: function (options) {
    this.note  = options.note;
    this.notes = options.notes;
    this.note.bind('invalid', this.showErrors, this);
  },

  showErrors: function (note, errors) {
    var errMsg = "";
		_.each(_.keys(errors), _.bind(function (key) {
      errMsg = errMsg + key + "\n";
    }, this));
		alert("Please enter a valid : \n" + errMsg);
  },

  save: function (event) {
    event.stopPropagation();
    event.preventDefault();

    // update model with values from the form
		if(this.note.id)
		{
			this.note.set({
				title: this.$el.find('input[name=title]').val(),
				description: this.$el.find('textarea[name=description]').val(),
				edited: moment().format('h:mm:ss a <br> DD/MM/YYYY'),
			});
		}
		else
		{
			this.note.set({
				title: this.$el.find('input[name=title]').val(),
				description: this.$el.find('textarea[name=description]').val(),
				created: moment().format('h:mm:ss a <br> DD/MM/YYYY'),
				edited: moment().format('h:mm:ss a <br> DD/MM/YYYY'),
				id: "T" + moment()
			});
		}
		
    if (this.note.isValid()){
      this.notes.add(this.note);
      // redirect back to the index
      window.location.hash = "notes/index";
    }
  },

  // Render the form
  render: function () {
    this.$el.html(_.template($('#formTemplate').html(), this.note.toJSON()));
    return this;
  }
});
