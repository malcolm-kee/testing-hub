const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');

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

	user.save(err => {
		if (err) {
			sendJSONresponse(res, 404, err);
		} else {
			mailer
				.sendVerifyEmail({ to: req.body.email, name: req.body.name })
				.then(() => {
					sendJSONresponse(res, 200, {
						token: user.generateJwt()
					});
				})
				.catch(sendMailErr => {
					sendJSONresponse(res, 404, sendMailErr);
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
