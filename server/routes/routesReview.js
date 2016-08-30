var controllers = require('../controllers/reviewCtrl.js');
var router = require('express').Router();
var helpers = require('../helpers/helpers.js');

router.post('/', helpers.tokenCheck, controllers['/'].post);

for (var route in controllers) {
  router.route(route)
  .get(controllers[route].get)
  .post(controllers[route].post)
  .put(controllers[route].put)
  .delete(controllers[route].delete);
}

module.exports = router;