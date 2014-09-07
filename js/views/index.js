
"use strict";
app.indexView = Backbone.View.extend({

  initialize: function (options) {
    this.notes = options.notes;
		this.notes.bind('reset', this.addAll(), this);
  },
	
	events: {
		'click thead th': 'addAll'
	},

  // render the index Template and call the function to populate the list
  render: function () {
    this.$el.html($('#indexTemplate').html());
    this.addAll();
    return this;
  },
	
	// Enable to sort the list and pass to addOne to add each row of model
  addAll: function (event) 
	{
		
		if(event)
		{
			var html;
		
			this.notes.comparator = function(note) 
			{
				return note.get(event.currentTarget.id);
			};
			this.notes.sort();
			
			html = event.currentTarget.innerHTML;

			if (html.indexOf("-arrow-down")>0)
			{
				html = html.replace("-arrow-down","-arrow-up");
				this.notes.models = this.notes.models.reverse();
			}

			else if (html.indexOf("-arrow-up")>0)
			{
				html = html.replace("-arrow-up","-arrow-down");
			}

			else html = html.concat('<span class = "glyphicon glyphicon-arrow-down"></span>');

			$(".glyphicon").remove();
			$("#" + event.currentTarget.id).html(html);

		}

		// clear out the contents of tbody
		this.$el.find('tbody').children().remove();
		
		// Populate tbody with sorted model
		_.each(this.notes.models, function (note) 
		{
			var view = new app.rowView(
			{
				notes: this.notes, 
				note: note
			});
			this.$el.find("tbody").append(view.render().el);
		}.bind(this));
	},
});

