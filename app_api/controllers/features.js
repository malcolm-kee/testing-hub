const mongoose = require('mongoose');
const merge = require('merge');

const Feature = mongoose.model('Feature');
const User = mongoose.model('User');

const sendJsonResponse = function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
};

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

const validateFeatureJson = function validateFeatureJson(featureJson) {
  function validateLinkJson(element) {
    return (
      typeof element.env === 'string' &&
      element.env.length > 0 &&
      typeof element.url === 'string' &&
      element.url.length > 0
    );
  }

  if (typeof featureJson === 'undefined' || featureJson === null) {
    return false;
  } else if (typeof featureJson.name !== 'string' || featureJson.name.length === 0) {
    return false;
  } else if (Array.isArray(featureJson.links) === false || featureJson.links.every(validateLinkJson) === false) {
    return false;
  }
  return true;
};

module.exports.featuresList = function exportFeaturesList(req, res) {
  Feature.find({ requireLogin: false }, 'name links', (err, features) => {
    if (err) {
      sendJsonResponse(res, 404, {
        message: 'error thrown by DB.'
      });
      return;
    } else if (features.length === 0) {
      sendJsonResponse(res, 404, {
        message: 'no feature is retrieved.'
      });
      return;
    }
    sendJsonResponse(res, 200, features);
  });
};

module.exports.featuresListAll = function exportFeatureListAll(req, res) {
  Feature.find({}, 'name requireLogin links', (err, features) => {
    if (err) {
      sendJsonResponse(res, 404, {
        message: 'error thrown by DB.'
      });
      return;
    }
    if (features.length === 0) {
      sendJsonResponse(res, 404, {
        message: 'no feature is retrieved.'
      });
      return;
    }
    sendJsonResponse(res, 200, features);
  });
};

module.exports.featureCreate = function exportFeatureCreate(request, response) {
  getAuthor(request, response, (req, res, userName) => {
    const feature = merge({}, req.body, { createdBy: userName });
    if (validateFeatureJson(feature)) {
      Feature.create(feature, (err, createdFeature) => {
        if (err) {
          sendJsonResponse(res, 404, {
            message: 'error thrown by DB.'
          });
          return;
        }
        sendJsonResponse(res, 200, { status: 'success', features: [createdFeature] });
      });
    } else {
      sendJsonResponse(res, 400, { message: 'Invalid Json' });
    }
  });
};

module.exports.featureReadOne = function exportFeatureReadOne(req, res) {
  Feature.findById(req.params.featureid, 'name links requireLogin', (err, feature) => {
    if (err) {
      sendJsonResponse(res, 404, {
        message: 'error thrown by DB.'
      });
      return;
    } else if (feature === null) {
      sendJsonResponse(res, 404, {
        message: 'no feature is retrieved.'
      });
      return;
    }
    sendJsonResponse(res, 200, { status: 'success', features: [feature] });
  });
};

module.exports.featureUpdateOne = function exportFeatureUpdateOne(request, response) {
  getAuthor(request, response, (req, res, userName) => {
    const featureInputData = req.body;
    const name = featureInputData.name;
    const requireLogin = featureInputData.requireLogin;
    const links = featureInputData.links;

    if (validateFeatureJson(featureInputData) === false) {
      sendJsonResponse(res, 400, {
        message: 'Invalid Json.'
      });
      return;
    }

    Feature.findById(req.params.featureid, (err, feature) => {
      if (err) {
        sendJsonResponse(res, 404, {
          message: 'error thrown by DB.'
        });
      } else if (feature === null) {
        sendJsonResponse(res, 404, {
          message: 'no feature is found.'
        });
      } else {
        feature.name = name;
        feature.requireLogin = requireLogin;
        feature.links = links;
        feature.lastUpdatedBy = userName;
        feature.save((saveErr, savedFeature) => {
          if (saveErr) {
            sendJsonResponse(res, 404, saveErr);
          } else {
            sendJsonResponse(res, 200, { status: 'success', features: [savedFeature] });
          }
        });
      }
    });
  });
};

module.exports.featureDeleteOne = function exportFeatureDeleteOne(request, response) {
  getAuthor(request, response, (req, res) => {
    Feature.findByIdAndRemove(req.params.featureid, (err, feature) => {
      if (err) {
        sendJsonResponse(res, 404, {
          message: 'error thrown by DB.'
        });
        return;
      } else if (feature === null) {
        sendJsonResponse(res, 404, {
          message: 'no feature is removed.'
        });
        return;
      }
      sendJsonResponse(res, 200, { status: 'success', features: [feature] });
    });
  });
};
