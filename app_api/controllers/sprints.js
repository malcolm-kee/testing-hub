const mongoose = require('mongoose');
const merge = require('merge');

const Sprint = mongoose.model('Sprint');
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

const validateSprintJson = function validateSprintJson(sprintJson) {
  function validateSprintItem(element) {
    return typeof element.name === 'string' && element.name.length > 0;
  }

  if (typeof sprintJson === 'undefined' || sprintJson === null) {
    return false;
  } else if (typeof sprintJson.name !== 'string' || sprintJson.name.length === 0) {
    return false;
  } else if (typeof sprintJson.url !== 'string' || sprintJson.url.length === 0) {
    return false;
  } else if (
    Array.isArray(sprintJson.sprintItems) === false ||
    sprintJson.sprintItems.every(validateSprintItem) === false
  ) {
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

module.exports.sprintCreate = function exportSprintCreate(request, response) {
  getAuthor(request, response, (req, res, userName) => {
    const sprint = merge({}, req.body, { createdBy: userName });
    if (validateSprintJson(sprint) === false) {
      sendJsonResponse(res, 400, { message: 'Invalid Json' });
      return;
    }

    Sprint.create(sprint, (err, createdSprints) => {
      if (err) {
        sendJsonResponse(res, 404, {
          message: 'error thrown by DB.'
        });
        return;
      }
      sendJsonResponse(res, 200, { status: 'success', sprints: [createdSprints] });
    });
  });
};

module.exports.sprintReadOne = function exportSprintReadOne(req, res) {
  Sprint.findById(req.params.sprintid, 'name url desc sprintItems userName', (err, sprint) => {
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
  Sprint.findOne({ url: req.params.sprinturl }, 'name url desc sprintItems userName', (err, sprint) => {
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

module.exports.sprintUpdateOne = function exportSprintUpdateOne(request, response) {
  getAuthor(request, response, (req, res, userName) => {
    const sprintInputData = req.body;
    const name = sprintInputData.name;
    const url = sprintInputData.url;
    const desc = sprintInputData.desc;
    const sprintItems = sprintInputData.sprintItems;

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
        sprint.sprintItems = sprintItems;
        sprint.lastUpdatedBy = userName;
        sprint.save((saveErr, savedSprint) => {
          if (saveErr) {
            sendJsonResponse(res, 404, saveErr);
          } else {
            sendJsonResponse(res, 200, { status: 'success', sprints: [savedSprint] });
          }
        });
      }
    });
  });
};

module.exports.sprintItemUpdateOne = function exportSprintItemUpdateOne(request, response) {
  getAuthor(request, response, (req, res, userName) => {
    const sprintInputData = req.body;
    const newStatus = sprintInputData.status;

    if (
      typeof newStatus === 'undefined' ||
      newStatus === null ||
      ['Not Started', 'In Progress', 'Passed', 'Blocked'].includes(newStatus) === false
    ) {
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
        const currentSprintItems = sprint.sprintItems;
        sprint.sprintItems = currentSprintItems.map(sprintItem => {
          if (sprintItem.id === req.params.itemid) {
            return merge(sprintItem, { status: newStatus });
          }
          return sprintItem;
        });
        sprint.lastUpdatedBy = userName;
        sprint.save((saveErr, savedSprint) => {
          if (saveErr) {
            sendJsonResponse(res, 404, saveErr);
          } else {
            sendJsonResponse(res, 200, { status: 'success', sprints: [savedSprint] });
          }
        });
      }
    });
  });
};

module.exports.sprintDeleteOne = function exportSprintDeleteOne(request, response) {
  getAuthor(request, response, (req, res) => {
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
  });
};
