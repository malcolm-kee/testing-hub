const express = require('express');
const jwt = require('express-jwt');

const ctrlFeature = require('../controllers/features');
const ctrlSprint = require('../controllers/sprints');
const ctrlAuth = require('../controllers/authentications');
const ctrlUser = require('../controllers/users');

const router = express.Router();
const auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});

router.get('/feature', ctrlFeature.featuresList);
router.post('/feature', auth, ctrlFeature.featureCreate);
router.get('/feature/id/:featureid', ctrlFeature.featureReadOne);
router.put('/feature/id/:featureid', auth, ctrlFeature.featureUpdateOne);
router.delete('/feature/id/:featureid', auth, ctrlFeature.featureDeleteOne);

router.get('/sprint', ctrlSprint.sprintsList);
router.post('/sprint', auth, ctrlSprint.sprintCreate);
router.get('/sprint/id/:sprintid', ctrlSprint.sprintReadOne);
router.get('/sprint/url/:sprinturl', ctrlSprint.sprintReadOneByUrl);
router.put('/sprint/id/:sprintid', auth, ctrlSprint.sprintUpdateOne);
router.put('/sprint/id/:sprintid/item/:itemid', auth, ctrlSprint.sprintItemUpdateOne);
router.delete('/sprint/id/:sprintid', auth, ctrlSprint.sprintDeleteOne);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.get('/user', auth, ctrlUser.userList);
router.get('/user/id/:userid', auth, ctrlUser.userReadOne);
router.put('/user/id/:userid', auth, ctrlUser.userUpdateOne);

module.exports = router;
