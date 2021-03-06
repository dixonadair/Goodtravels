Goodtravels.Views.ReviewForm = Backbone.View.extend({
  template: JST["reviews/form"],

  events: {
    'click .close': 'remove',
    'click .m-backdrop': 'remove',
    'submit .new-review': 'submitReview',
  },

  initialize: function (options) {
    this.activity = options.activity;
    this.activity_id = options.activity_id;
  },

  render: function () {
    this.$el.html(this.template({ review: this.model }));

    var that = this;
    setTimeout(function () {
      that.$('.new-review-stars').raty({
        path: '',
        half: true,
        click: function (score, event) {
          var roundedScore = (Math.round(score * 2) / 2).toFixed(1);
          that.$('#rating-value').attr('value', roundedScore);
        },
        score: this.model.get('rating'),
      });
    }.bind(this), 100);

    return this;
  },

  submitReview: function (event) {
    event.preventDefault();
    var formData = this.$('.m-content > form').serializeJSON();
    this.model.set(formData);
    this.model.set({ "activity_id": this.activity ? this.activity.id : this.activity_id });
    var that = this;
    this.model.save({}, {
      success: function () {
        if (that.collection) {
          that.collection.add(that.model, { merge: true });
        }
        that.remove();

        if (that.activity) { that.activity.fetch(); }
      }
    });
  }
});
