const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const IngredientsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  }
});

const RatesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rate: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
});

const CocktailSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  ingredients: [IngredientsSchema],
  rates: [RatesSchema],
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
});

CocktailSchema.plugin(uniqueValidator, {message: 'Error, such cocktail already exists!'});
const Cocktail = mongoose.model('Cocktail', CocktailSchema);

module.exports = Cocktail;