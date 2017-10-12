const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const testLinkSchema = new mongoose.Schema({
	env: String,
	url: { type: String, required: true }
}).set('toJSON', {
	virtuals: true
});

const featureSchema = new mongoose.Schema({
	name: { type: String, required: true },
	details: String,
	links: [testLinkSchema],
	categories: [String]
}).set('toJSON', {
	virtuals: true
});

/* const sprintFeatureSchema = new mongoose.Schema({
	featureId: { type: String, required: true },
	desc: String,
	status: String
}).set('toJSON', {
	virtuals: true
});
*/

const sprintItem = new mongoose.Schema({
	name: { type: String, required: true },
	featureId: String,
	status: String,
	desc: String
}).set('toJSON', {
	virtuals: true
});

const sprintSchema = new mongoose.Schema({
	name: { type: String, required: true },
	url: { type: String, required: true, unique: true },
	desc: String,
	sprintItems: [sprintItem]
})
	.set('toJSON', {
		virtuals: true
	})
	.plugin(uniqueValidator);

mongoose.model('Feature', featureSchema, 'features');
mongoose.model('Sprint', sprintSchema, 'sprints');
