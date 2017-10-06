const mongoose = require('mongoose');

const Sprint = mongoose.model('Sprint');

const sendJsonResponse = function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
};

const validateSprintJson = function validateSprintJson(sprintJson) {
  function validateFeatureJson(element) {
    return typeof element.featureId === 'string' && element.featureId.length > 0;
  }

  if (typeof sprintJson === 'undefined' || sprintJson === null) {
    return false;
  } else if (typeof sprintJson.name !== 'string' || sprintJson.name.length === 0) {
    return false;
  } else if (typeof sprintJson.url !== 'string' || sprintJson.url.length === 0) {
    return false;
  } else if (Array.isArray(sprintJson.features) === false || sprintJson.features.every(validateFeatureJson) === false) {
    return false;
  }
  return true;
};

module.exports.sprintsList = function exportSprintList(req, res) {
  Sprint.find({}, 'name url', (err, sprints) => {
    if (err) {
      sendJsonResponse(res, 404, {
        message: 'error thrown by DB.'
      });
      return;
    } else if (sprints.length === 0) {
      sendJsonResponse(res, 404, {
        message: 'no sprint is retrieved.'
      });
      return;
    }
    sendJsonResponse(res, 200, sprints);
  });
};

module.exports.sprintCreate = function exportFeatureCreate(req, res) {
  const sprint = req.body;
  if (validateSprintJson(sprint)) {
    Sprint.create(sprint, (err, createdSprints) => {
      if (err) {
        sendJsonResponse(res, 404, {
          message: 'error thrown by DB.'
        });
        return;
      }
      sendJsonResponse(res, 200, { status: 'success', sprints: [createdSprints] });
    });
  } else {
    sendJsonResponse(res, 400, { message: 'Invalid Json' });
  }
};

module.exports.sprintReadOne = function exportSprintReadOne(req, res) {
  Sprint.findById(req.params.sprintid, 'name url desc features', (err, sprint) => {
    if (err) {
      sendJsonResponse(res, 404, {
        message: 'error thrown by DB.'
      });
      return;
    } else if (sprint === null) {
      sendJsonResponse(res, 404, {
        message: 'no sprint is retrieved.'
      });
      return;
    }
    sendJsonResponse(res, 200, { status: 'success', sprints: [sprint] });
  });
};

module.exports.sprintReadOneByUrl = function exportSprintReadOneByUrl(req, res) {
  Sprint.findOne({ url: req.params.sprinturl }, 'name url desc features', (err, sprint) => {
    if (err) {
      sendJsonResponse(res, 404, {
        message: 'error thrown by DB.'
      });
      return;
    } else if (sprint === null) {
      sendJsonResponse(res, 404, {
        message: 'no sprint is retrieved.'
      });
      return;
    }
    sendJsonResponse(res, 200, { status: 'success', sprints: [sprint] });
  });
};

module.exports.sprintUpdateOne = function exportSprintUpdateOne(req, res) {
  const sprintInputData = req.body;
  const name = sprintInputData.name;
  const url = sprintInputData.url;
  const desc = sprintInputData.desc;
  const features = sprintInputData.features;

  if (validateSprintJson(sprintInputData) === false) {
    sendJsonResponse(res, 400, {
      message: 'Invalid Json.'
    });
    return;
  }

  Sprint.findById(req.params.sprintid, (err, sprint) => {
    if (err) {
      sendJsonResponse(res, 404, {
        message: 'error thrown by DB.'
      });
    } else if (sprint === null) {
      sendJsonResponse(res, 404, {
        message: 'no sprint is found.'
      });
    } else {
      sprint.name = name;
      sprint.url = url;
      sprint.desc = desc;
      sprint.features = features;
      sprint.save((saveErr, savedSprint) => {
        if (saveErr) {
          sendJsonResponse(res, 404, saveErr);
        } else {
          sendJsonResponse(res, 200, { status: 'success', sprints: [savedSprint] });
        }
      });
    }
  });
};

module.exports.sprintDeleteOne = function exportSprintDeleteOne(req, res) {
  Sprint.findByIdAndRemove(req.params.sprintid, (err, sprint) => {
    if (err) {
      sendJsonResponse(res, 404, {
        message: 'error thrown by DB.'
      });
      return;
    } else if (sprint === null) {
      sendJsonResponse(res, 404, {
        message: 'no sprint is removed.'
      });
      return;
    }
    sendJsonResponse(res, 200, { status: 'success', sprints: [sprint] });
  });
};
