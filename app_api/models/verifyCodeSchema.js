const mongoose = require('mongoose');

const verifyCodeSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	code: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	expireAt: {
		type: Date,
		default: undefined
	}
})
	.index(
		{
			expireAt: 1
		},
		{
			expireAfterSeconds: 0
		}
	)
	.set('toJSON', {
		virtuals: true
	});

mongoose.model('VerifyCode', verifyCodeSchema, 'verifyCodes');
