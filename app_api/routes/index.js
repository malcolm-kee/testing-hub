var express = require('express');
var router = express.Router();
var ctrlFeature = require('../controllers/features');

router.get('/feature', ctrlFeature.featuresList);
router.post('/feature', ctrlFeature.featureCreate);
router.get('/feature/id/:featureid', ctrlFeature.featureReadOne);
router.put('/feature/id/:featureid', ctrlFeature.featureUpdateOne);
router.delete('/feature/id/:featureid', ctrlFeature.featureDeleteOne);

module.exports = router;