// controllers/productController.js
const pool = require('../db');

exports.addProduct = async (req,res) => {
  try {
    const { nom_prod, description_prod, prix_unit, remise, image_prod, qte_prod, id_categorie, id_entrepot,id_user} = req.body;
    const newProduct = await pool.query(
      "INSERT INTO produit (nom_prod, description_prod, prix_unit, remise, image_prod, qte_prod, id_categorie, id_entrepot ,id_user) VALUES($1, $2, $3, $4, $5, $6, $7, $8,$9)",
      [nom_prod, description_prod, prix_unit, remise, image_prod, qte_prod, id_categorie, id_entrepot, id_user]
    );
    res.json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la création du produit.' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const allProduct = await pool.query("SELECT * FROM produit ");
    res.json(allProduct.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des produits.' });
  }
};

exports.getAllProductsForUser = async (req, res) => {
  try {
    const { id }=req.params;
    const allProductsForUser = await pool.query("SELECT * FROM produit WHERE id_user = $1",[id]);
    res.json(allProductsForUser.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const selectedProduct = await pool.query("SELECT * FROM produit WHERE id_prod = $1", [id]);
    res.json(selectedProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération du produit.' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom_prod, description_prod, prix_unit, remise, qte_prod, id_categorie, id_entrepot } = req.body;
    const updatedProduct = await pool.query(
      "UPDATE produit SET nom_prod = $1, description_prod = $2, prix_unit = $3, remise = $4, qte_prod = $5, id_categorie = $6, id_entrepot = $7 WHERE id_prod = $8",
      [nom_prod, description_prod, prix_unit, remise, qte_prod, id_categorie, id_entrepot, id]
    );
    res.json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour du produit.' });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await pool.query("DELETE FROM produit WHERE id_prod = $1", [id]);
    res.json(deleteProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression du produit.' });
  }
};

exports.getProductsNumber = async(req,res)=> {
  try {
    const { id } = req.params;
    const numberOfProducts = await pool.query("SELECT COUNT(*) AS product_number FROM produit where id_user =$1", [id]);
    res.json(numberOfProducts.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Une erreur s'est produite lors de la selection des produits." });
  }
}
