const express = require('express');
const router = express.Router();
const ctrlFeature = require('../controllers/features');
const ctrlSprint = require('../controllers/sprints');

router.get('/feature', ctrlFeature.featuresList);
router.post('/feature', ctrlFeature.featureCreate);
router.get('/feature/id/:featureid', ctrlFeature.featureReadOne);
router.put('/feature/id/:featureid', ctrlFeature.featureUpdateOne);
router.delete('/feature/id/:featureid', ctrlFeature.featureDeleteOne);

router.get('/sprint', ctrlSprint.sprintsList);
router.post('/sprint', ctrlSprint.sprintCreate);
router.get('/sprint/id/:sprintid', ctrlSprint.sprintReadOne);
router.get('/sprint/url/:sprinturl', ctrlSprint.sprintReadOneByUrl);
router.put('/sprint/id/:sprintid', ctrlSprint.sprintUpdateOne);
router.put('/sprint/id/:sprintid/item/:itemid', ctrlSprint.sprintItemUpdateOne);
router.delete('/sprint/id/:sprintid', ctrlSprint.sprintDeleteOne);

module.exports = router;
