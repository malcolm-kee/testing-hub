var mongoose = require('mongoose');
var testLinkSchema = new mongoose.Schema({
  env: String,
  url: { type: String, required: true }
});
var featureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  details: String,
  links: [testLinkSchema],
  categories: [String]
});
mongoose.model('Feature', featureSchema, 'features');
