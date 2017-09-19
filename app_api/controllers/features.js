const mongoose = require('mongoose');

const Feature = mongoose.model('Feature');

const sendJsonResponse = function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
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
  } else if (typeof featureJson.name !== 'string' || featureJson.length === 0) {
    return false;
  } else if (Array.isArray(featureJson.categories) === false) {
    return false;
  } else if (Array.isArray(featureJson.links) === false || featureJson.links.every(validateLinkJson) === false) {
    return false;
  }
  return true;
};

module.exports.featuresList = function exportFeaturesList(req, res) {
  Feature.find({}, 'name categories links', (err, features) => {
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

module.exports.featureCreate = function exportFeatureCreate(req, res) {
  const feature = req.body;
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
};

module.exports.featureReadOne = function exportFeatureReadOne(req, res) {
  Feature.findById(req.params.featureid, 'name categories links', (err, feature) => {
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

module.exports.featureUpdateOne = function exportFeatureUpdateOne(req, res) {
  const featureInputData = req.body;
  const name = featureInputData.name;
  const categories = featureInputData.categories;
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
      feature.categories = categories;
      feature.links = links;
      feature.save((saveErr, savedFeature) => {
        if (saveErr) {
          sendJsonResponse(res, 404, saveErr);
        } else {
          sendJsonResponse(res, 200, { status: 'success', features: [savedFeature] });
        }
      });
    }
  });
};

module.exports.featureDeleteOne = function exportFeatureDeleteOne(req, res) {
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
};
