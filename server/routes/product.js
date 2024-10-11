// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/addProduct', productController.addProduct);
router.get('/getAllProducts', productController.getAllProducts);
router.get("/getAllProductsForUser/:id",productController.getAllProductsForUser);
router.get('/getproduct/:id', productController.getProductById);
router.put('/updateProduct/:id', productController.updateProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);
router.get("/getProductsNumber/:id",productController.getProductsNumber);




module.exports = router;