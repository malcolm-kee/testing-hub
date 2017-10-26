const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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
	sprintItems: [sprintItem],
	createdBy: String,
	lastUpdatedBy: String
})
	.set('toJSON', {
		virtuals: true
	})
	.plugin(uniqueValidator);

mongoose.model('Sprint', sprintSchema, 'sprints');
