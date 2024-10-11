const router = require("express").Router();
const userController=require('../controllers/userController');

router.get("/getUser/:id",userController.getUser);
router.put("/updateUser/:id",userController.updateUser);
router.put("/updatePwd",userController.updatePwd);
module.exports=router;