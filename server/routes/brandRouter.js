const Router = require('express');

const checkRole = require('../middleware/checkRoleMiddleware');

const router = new Router();

const brandController = require('../controllers/brandController');

router.post('/', checkRole('ADMIN')  , brandController.create);
router.get('/', brandController.getAll);
router.delete('/', checkRole('ADMIN')  , brandController.remove);



module.exports = router;