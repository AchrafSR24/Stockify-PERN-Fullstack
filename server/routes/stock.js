const router = require("express").Router();
const stockController = require('../controllers/stockController');


router.post("/addToStock", stockController.addToStock);

router.get("/showActualStock", stockController.showActualStock);


router.put("/updateStockProduct/:id", stockController.updateStockProduct);

router.get("/getStock/:id", stockController.getStock);
router.get("/getStockNumber/:id",stockController.getStockNumber);

module.exports=router;