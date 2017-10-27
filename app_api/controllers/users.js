const mongoose = require('mongoose');

const User = mongoose.model('User');

const mailer = require('../config/mailer');

function sendJsonResponse(res, status, content) {
	res.status(status);
	res.json(content);
}

const getAuthor = function getAuthor(req, res, callback) {
	if (req.payload && req.payload.email) {
		User.findOne({ email: req.payload.email }, (err, user) => {
			if (!user) {
				sendJsonResponse(res, 404, {
					message: 'User not found.'
				});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			callback(req, res, user.name);
		});
	} else {
		sendJsonResponse(res, 404, {
			message: 'User not found.'
		});
	}
};

module.exports.userList = function exportUserList(req, res) {
	User.find({}, 'email name isAdmin verified', (err, users) => {
		if (err) {
			sendJsonResponse(res, 404, {
				message: 'error thrown by DB.'
			});
			return;
		} else if (users.length === 0) {
			sendJsonResponse(res, 404, {
				message: 'no user is retrieved.'
			});
			return;
		}
		sendJsonResponse(res, 200, users);
	});
};

module.exports.userReadOne = function exportUserReadOne(req, res) {
	User.findById(req.params.userid, 'name email isAdmin verified', (err, user) => {
		if (err) {
			sendJsonResponse(res, 404, {
				message: 'error thrown by DB.'
			});
		} else if (user === null) {
			sendJsonResponse(res, 404, {
				message: 'no user is found.'
			});
		} else {
			sendJsonResponse(res, 200, { status: 'success', users: [user] });
		}
	});
};

module.exports.userCreate = function exportUserCreate(request, response) {
	getAuthor(request, response, (req, res, userName) => {
		const userInputData = req.body;
		const name = userInputData.name;
		const email = userInputData.email;
		const isAdmin = userInputData.isAdmin || false;
		const password = userInputData.password;

		if (!name || !email || !password) {
			sendJsonResponse(res, 400, {
				message: 'All fields are required.'
			});
			return;
		}

		User.create({ name, email, isAdmin, verified: true, createdBy: userName })
			.then(user => {
				user.setPassword(password);
				user.save(err => {
					if (err) {
						sendJsonResponse(res, 404, err);
						return;
					}
					mailer
						.sendAccountCreatedEmail({ to: email, name })
						.then(() => {
							sendJsonResponse(res, 200, {});
						})
						.catch(sendEmailErr => {
							sendJsonResponse(res, 404, sendEmailErr);
						});
				});
			})
			.catch(createUserErr => {
				sendJsonResponse(res, 404, createUserErr);
			});
	});
};

module.exports.userUpdateOne = function exportUserUpdateOne(request, response) {
	getAuthor(request, response, (req, res, userName) => {
		const userInputData = req.body;
		const name = userInputData.name;
		const email = userInputData.email;
		const isAdmin = userInputData.isAdmin;
		const verified = userInputData.verified;
		const password = userInputData.password;

		User.findById(req.params.userid, (err, user) => {
			if (err) {
				sendJsonResponse(res, 404, {
					message: 'error thrown by DB.'
				});
			} else if (user === null) {
				sendJsonResponse(res, 404, {
					message: 'no user is found.'
				});
			} else {
				user.name = name;
				user.email = email;
				user.isAdmin = isAdmin;
				user.verified = verified;
				user.lastUpdatedBy = userName;
				if (password) {
					user.setPassword(password);
				}
				user.save(saveErr => {
					if (saveErr) {
						sendJsonResponse(res, 404, saveErr);
					} else {
						sendJsonResponse(res, 200, { status: 'success' });
					}
				});
			}
		});
	});
};
