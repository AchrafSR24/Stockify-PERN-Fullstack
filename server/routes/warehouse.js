const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouseController");

router.post("/addWarehouse", warehouseController.addWarehouse);
router.get("/getWarehouse/:id", warehouseController.getWarehouse);
router.get("/getAllWarehousesForUser/:id",warehouseController.getAllWarehousesForUser);
router.get("/getAllWarehouses", warehouseController.getAllWarehouses);
router.get("/getAllNamesWarehouses/:id", warehouseController.getAllNamesWarehouses);
router.delete("/deleteWarehouse/:id", warehouseController.deleteWarehouse);
router.put("/updateWarehouse/:id", warehouseController.updateWarehouse);
router.get("/getWarehousesNumber/:id",warehouseController.getWarehousesNumber);

module.exports = router;


