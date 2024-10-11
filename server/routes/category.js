const router = require("express").Router();
const categoryController = require('../controllers/categoryController');

// Ajouter une catégorie
router.post("/addCategory", categoryController.addCategory);

// Récupérer une catégorie
router.get("/getCategory/:id", categoryController.getCategory);

router.get("/getAllCategoriesForUser/:id",categoryController.getAllCategoriesForUser);

// Récupérer toutes les catégories
router.get("/getAllCategories", categoryController.getAllCategories);

// Récupérer tous les noms de catégories
router.get("/getAllNamesCategories/:id", categoryController.getAllNamesCategories);

// Supprimer une catégorie
router.delete("/deleteCategory/:id", categoryController.deleteCategory);

// Mettre à jour une catégorie
router.put("/updateCategory/:id", categoryController.updateCategory);
router.get("/getCategoriesNumber/:id",categoryController.getCategoriesNumber);

module.exports = router;

