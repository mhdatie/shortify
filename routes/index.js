const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');
const pj = require('../package.json');

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).json({ name: pj.name, version: pj.version});
});

/* Create a short URL */
router.post('/', controller.saveUrl);

/* Get original URL */
router.get('/:code', controller.getUrl);

module.exports = router;
