const passport = require('passport');
const mongoose = require('mongoose');
const ulid = require('ulid');

const User = mongoose.model('User');
const VerifyCode = mongoose.model('VerifyCode');

const mailer = require('../config/mailer');

function sendJSONresponse(res, status, content) {
	res.status(status);
	res.json(content);
}

module.exports.register = function exportRegister(req, res) {
	if (!req.body.name || !req.body.email || !req.body.password) {
		sendJSONresponse(res, 400, {
			message: 'All fields are required.'
		});
		return;
	}

	const user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
	user.isAdmin = req.body.isAdmin || false;
	user.setPassword(req.body.password);

	user.save((err, savedUser) => {
		if (err) {
			sendJSONresponse(res, 404, err);
		} else {
			const expireDate = new Date();
			expireDate.setDate(expireDate.getDate() + 1);
			VerifyCode.create({ userId: savedUser.id, code: ulid(), expireAt: expireDate })
				.then(verifyCode => {
					mailer
						.sendVerifyEmail({ to: req.body.email, name: req.body.name, code: verifyCode.code })
						.then(() => {
							sendJSONresponse(res, 200, {});
						})
						.catch(sendMailErr => {
							sendJSONresponse(res, 404, sendMailErr);
						});
				})
				.catch(verifyCodeErr => {
					sendJSONresponse(res, 404, verifyCodeErr);
				});
		}
	});
};

module.exports.verify = function exportVerify(req, res) {
	if (!req.body.code) {
		sendJSONresponse(res, 400, {
			message: 'Invalid verification code'
		});
		return;
	}

	VerifyCode.findOneAndRemove({ code: req.body.code }, (err, verifyCode) => {
		if (!verifyCode) {
			sendJSONresponse(res, 400, {
				message: 'Invalid verification code'
			});
		} else if (err) {
			sendJSONresponse(res, 404, err);
		} else {
			const userId = verifyCode.userId;
			User.findById(userId, (error, user) => {
				if (error) {
					sendJSONresponse(res, 404, error);
				} else if (user === null) {
					sendJSONresponse(res, 404, {
						message: 'User no longer exists.'
					});
				} else {
					user.verified = true;
					user.save((saveErr, savedUser) => {
						if (saveErr) {
							sendJSONresponse(res, 404, saveErr);
						} else {
							sendJSONresponse(res, 200, { status: 'success', token: savedUser.generateJwt() });
						}
					});
				}
			});
		}
	});
};

module.exports.login = function exportLogin(req, res) {
	if (!req.body.email || !req.body.email) {
		sendJSONresponse(res, 400, {
			message: 'All fields are required.'
		});
		return;
	}

	passport.authenticate('local', (err, user, info) => {
		if (err) {
			sendJSONresponse(res, 404, err);
			return;
		}

		if (user) {
			sendJSONresponse(res, 200, {
				token: user.generateJwt()
			});
		} else {
			sendJSONresponse(res, 401, info);
		}
	})(req, res);
};
