var HTTP = require('../services/httpservice');
var Reflux = require('reflux');
var Actions = require('./actions.jsx');

var IngredientStore = Reflux.createStore({
  listenables: [Actions],
  getIngredients: function() {
    HTTP.get('/ingredients')
    .then(function(json) {
        this.ingredients = json;
        this.fireUpdate();
    }.bind(this));

  },
  postIngredients: function(text) {
     if (!this.ingredients) {
         this.ingredients = [];
     }

       var ingredient = {
         "text": text,
         "id":Math.floor(Date.now() / 1000) + text
       };
       this.ingredients.push(ingredient);
       this.fireUpdate();
       
  },
  fireUpdate: function() {
      this.trigger('change', this.ingredients);
  }
});
module.exports = IngredientStore;
