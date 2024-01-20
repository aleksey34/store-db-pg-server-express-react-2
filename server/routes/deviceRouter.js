const Router = require('express');

const checkRole = require('../middleware/checkRoleMiddleware');

const router = new Router();


const deviceController = require('../controllers/deviceController')

router.post('/',checkRole('ADMIN')  , deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);
router.delete('/:id',checkRole('ADMIN') , deviceController.remove);



module.exports = router;