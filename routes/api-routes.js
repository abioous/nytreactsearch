var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller.js');

/*
 * GET
 */
router.get('/api/saved', controller.list);

/*
 * GET
 */
router.get('/api/saved/:id', controller.show);

/*
 * POST
 */
router.post('/api/saved', controller.create);


/*
 * DELETE
 */
router.delete('/api/saved/:id', controller.remove);

module.exports = router;
