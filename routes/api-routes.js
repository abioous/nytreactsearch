var controller = require('../controllers/controller.js');

module.exports = function (app) {


	/*
	 * GET
	 */
	app.get('/api/saved', controller.list);

	/*
	 * GET
	 */
	app.get('/api/saved/:id', controller.show);

	/*
	 * POST
	 */
	app.post('/api/saved', controller.create);


	/*
	 * DELETE
	 */
	app.delete('/api/saved/:id', controller.remove);


}

