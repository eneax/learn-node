const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // we tell mongoose that we want to use 'async'
const slug = require('slugs'); // allows you to make URL friendly names

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String],
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates!'
    }],
    address: {
      type: String,
      required: 'You must supply an address!'
    }
  }
});

storeSchema.pre('save', function(next) {  // we run this only is the name changes
  if (!this.isModified('name')) {         // if the store name is not modified
    next();                               // skip it
    return;                               // stop this function from running
  }
  this.slug = slug(this.name);            // this --> the store that we are trying to save
  next();                                 // once the slug has finished, move on
});
// TODO make more resilient so slugs are unique

module.exports = mongoose.model('Store', storeSchema);









/*

* Schema --> describes how the data will look like

* MongoDB is our database

* mongoose is the package that we use to interface with the database (it can be used with any language: Python, Ruby, PHP)

* module.exports --> because it's the main thing that we are exporting (it's a function and not an obj with many properties on it)

* trim: true --> removes space before and after the text

* required: 'Please enter a store name' --> it'll be true and at the same time pass a message error

* slug --> it will be auto generated whenever somebody saves a Store. We do this with a pre-save hook

*/ 