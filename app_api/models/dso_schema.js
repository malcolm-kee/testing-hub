const mongoose = require('mongoose');

const testLinkSchema = new mongoose.Schema({
	env: String,
	url: { type: String, required: true }
});

const featureSchema = new mongoose.Schema({
	name: { type: String, required: true },
	details: String,
	links: [testLinkSchema],
	categories: [String]
});

mongoose.model('Feature', featureSchema, 'features');
