Goodtravels.Views.ActivitiesIndexItem = Backbone.View.extend({
  className: 'activities-index-item',
  template: JST['activities/indexItem'],
  events: {
    'click':'linkToActivity'
  },

  initialize: function (options) {
    this.$el.attr('data-id', this.model.id);
  },

  render: function () {
    var content = this.template({ activity: this.model });
    this.$el.html(content);
    // this.$('.activities-index-pictures').css("background-size", "cover");

    setTimeout( function () {
      this.$('div.index-item-stars').raty({
        path: 'assets',
        half: true,
        size: 1,
        readOnly: true,
        score: this.model.get('average_rating'),
      });
    }.bind(this), 0);
    return this;
  },

  linkToActivity: function (event) {
    var activityId = $(event.currentTarget).data('id');
    Backbone.history.navigate('activities/'+ activityId, { trigger: true });
  }

});
