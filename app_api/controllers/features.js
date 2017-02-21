var mongoose = require('mongoose');
var Feature = mongoose.model('Feature');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.featuresList = function(req, res) {
	Feature
		.find({})
		.select('name categories links')
		.exec(function(err, features) {
			if (err) {
				sendJsonResponse(res, 404, {
					"message": "error thrown by DB."
				});
				return;
			} else if (features.length === 0) {
				sendJsonResponse(res, 404, {
					"message": "no feature is retrieved."
				});
				return;
			}
			sendJsonResponse(res, 200, features);
		});
};

module.exports.featureCreate = function(req, res) {
	sendJsonResponse(res, 200, {"status": "success featureCreate"});
};

module.exports.featureReadOne = function(req, res) {
	sendJsonResponse(res, 200, {"status": "success featureReadOne"});
};

module.exports.featureUpdateOne = function(req, res) {
	sendJsonResponse(res, 200, {"status": "success featureUpdateOne"});
};

module.exports.featureDeleteOne = function(req, res) {
	sendJsonResponse(res, 200, {"status": "success featureDeleteOne"});
};
