const express = require('express');
const router = express.Router();
const mainController = require('../controllers');
const pj = require('../package.json');

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).json({ name: pj.name, version: pj.version});
});

/* Create a short URL */
router.post('/', mainController.saveUrl);

/* Get original URL */
router.get('/:code', mainController.getUrl);

module.exports = router;
