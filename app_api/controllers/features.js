var mongoose = require('mongoose');
var Feature = mongoose.model('Feature');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

var validateCreateJson = function(featureJson) {
	console.log(featureJson);
    if (typeof featureJson === "undefined" || featureJson === null) {
    	console.log("featureJson validation fails");
        return false;
    } else if (typeof featureJson.name !== "string" || featureJson.length === 0) {
    	console.log("featureJson.name validation fails");
        return false;
    } else if (Array.isArray(featureJson.categories) === false) {
    	console.log("featureJson.categories validation fails");
        return false;
    } else if (Array.isArray(featureJson.links) === false || featureJson.links.every(validateLinkJson) === false) {
    	console.log("featureJson.links validation fails");
        return false;
    } else {
    	return true;
    }

    function validateLinkJson(element, index, array) {
        return (typeof element.env === "string" && element.env.length > 0 &&
            typeof element.url === "string" && element.url.length > 0
        );
    }
};

module.exports.featuresList = function(req, res) {
    Feature.find({}, 'name categories links', function(err, features) {
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
    var feature = req.body;
    if (validateCreateJson(feature)) {
    	Feature.create(feature, function(err, feature) {
    		if (err) {
    			console.log(err);
    			sendJsonResponse(res, 404, {
                	"message": "error thrown by DB."
            	});
            	return;
    		}
    		sendJsonResponse(res, 200, { "status": "success featureCreateOne", "features": [feature] });
    	});
    } else {
    	sendJsonResponse(res, 400, { "status": "Invalid Json" });
    }
};

module.exports.featureReadOne = function(req, res) {
    Feature.findById(req.params.featureid, 'name categories links', function(err, feature) {
        if (err) {
            console.log(err);
            sendJsonResponse(res, 404, {
                "message": "error thrown by DB."
            });
            return;
        } else if (feature === null) {
            sendJsonResponse(res, 404, {
                "message": "no feature is retrieved."
            });
            return;
        }
        sendJsonResponse(res, 200, { "status": "success featureReadOne", "features": [feature] });
    });
};

module.exports.featureUpdateOne = function(req, res) {
    var name = req.body.name,
        categories = req.body.categories;
    if (typeof name === "undefined" || name === null || typeof categories === "undefined" || categories === null) {
        sendJsonResponse(res, 400, {
            "message": "Missing name or categories."
        });
        return;
    }

    Feature.findById(req.params.featureid, function(err, feature) {
        if (err) {
            console.log(err);
            sendJsonResponse(res, 404, {
                "message": "error thrown by DB."
            });
            return;
        } else if (feature === null) {
            sendJsonResponse(res, 404, {
                "message": "no feature is found."
            });
            return;
        } else {
            feature.name = name;
            feature.categories = categories;
            feature.save(function(err, feature) {
                if (err) {
                    sendJsonResponse(res, 404, err);
                } else {
                    sendJsonResponse(res, 200, { "status": "success featureUpdateOne", "features": [feature] });
                }
            });
        }
    });
};

module.exports.featureDeleteOne = function(req, res) {
    Feature.findByIdAndRemove(req.params.featureid, function(err, feature) {
        if (err) {
            console.log(err);
            sendJsonResponse(res, 404, {
                "message": "error thrown by DB."
            });
            return;
        } else if (feature === null) {
            sendJsonResponse(res, 404, {
                "message": "no feature is removed."
            });
            return;
        }
        sendJsonResponse(res, 200, { "status": "success featureDeleteOne", "features": [feature] });
    });
};

module.exports.featuresListPilot = function(req, res) {
    console.log("in featuresListPilot");
    Feature
        .find({}, '_id name categories links', function(err, features) {
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
            console.log('==========');
            console.log('response in featuresListPilot');
            console.log(features);
            console.log('==========');
            sendJsonResponse(res, 200, features);
        });
};
