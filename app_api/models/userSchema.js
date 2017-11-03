const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

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
	isAdmin: { type: Boolean, default: false },
	createdBy: String,
	lastUpdatedBy: String,
	verified: { type: Boolean, default: false },
	hash: String,
	salt: String
})
	.set('toJSON', {
		virtuals: true
	})
	.plugin(uniqueValidator);

userSchema.methods.setPassword = function userSetPassword(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

userSchema.methods.validatePassword = function userValidatePassword(password) {
	const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
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

mongoose.model('User', userSchema, 'users');
