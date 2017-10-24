const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

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
	categories: [String],
	createdBy: String,
	lastUpdatedBy: String
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
	sprintItems: [sprintItem],
	createdBy: String,
	lastUpdatedBy: String
})
	.set('toJSON', {
		virtuals: true
	})
	.plugin(uniqueValidator);

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	isAdmin: Boolean,
	createdBy: String,
	lastUpdatedBy: String,
	hash: String,
	salt: String
})
	.set('toJSON', {
		virtuals: true
	})
	.plugin(uniqueValidator);

userSchema.methods.setPassword = function userSetPassword(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validatePassword = function userValidatePassword(password) {
	const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return this.hash === hash;
};

userSchema.methods.generateJwt = function userGenerateJwt() {
	const expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);

	return jwt.sign(
		{
			id: this.id,
			email: this.email,
			name: this.name,
			isAdmin: this.isAdmin,
			exp: parseInt(expiry.getTime() / 1000, 10)
		},
		process.env.JWT_SECRET
	);
};

mongoose.model('Feature', featureSchema, 'features');
mongoose.model('Sprint', sprintSchema, 'sprints');
mongoose.model('User', userSchema, 'users');
