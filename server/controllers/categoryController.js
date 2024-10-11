const pool = require('../db');

// Ajouter une catégorie
exports.addCategory = async (req, res) => {
  try {
    const { nom_categorie, description_categorie,id_user} = req.body;
    const newCategory = await pool.query(
      "INSERT INTO categorie (nom_categorie, description_categorie,id_user) VALUES ($1, $2,$3) RETURNING *",
      [nom_categorie, description_categorie,id_user]
    );
    res.status(201).json(newCategory.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la création de la catégorie' });
  }
};

// Récupérer une catégorie
exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const selectedCategory = await pool.query(
      "SELECT * FROM categorie WHERE id_categorie = $1",
      [id]
    );
    if (selectedCategory.rows.length === 0) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }
    res.json(selectedCategory.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération de la catégorie' });
  }
};

exports.getAllCategoriesForUser = async (req, res) => {
  try {
    const { id }=req.params;
    const allCategoriesForUser = await pool.query("SELECT * FROM categorie WHERE id_user = $1",[id]);
    res.json(allCategoriesForUser.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Récupérer toutes les catégories
exports.getAllCategories = async (req, res) => {
  try {
    const allCategories = await pool.query("SELECT * FROM categorie");
    res.json(allCategories.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des catégories' });
  }
};

// Récupérer tous les noms de catégories
exports.getAllNamesCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const allNamesCategories = await pool.query("SELECT id_categorie,nom_categorie FROM categorie where id_user=$1",[id]);
    res.json(allNamesCategories.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des noms de catégories' });
  }
};

// Supprimer une catégorie
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCategory = await pool.query(
      "DELETE FROM categorie WHERE id_categorie = $1 RETURNING *",
      [id]
    );
    if (deleteCategory.rows.length === 0) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }
    res.json(deleteCategory.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la suppression de la catégorie' });
  }
};

// Mettre à jour une catégorie
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom_categorie, description_categorie } = req.body;
    const updatedCategory = await pool.query(
      "UPDATE categorie SET nom_categorie = $1, description_categorie = $2 WHERE id_categorie = $3 ",
      [nom_categorie, description_categorie, id]
    );
    res.json(updatedCategory.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la catégorie' });
  }
};
exports.getCategoriesNumber = async(req,res)=> {
  try {
    const { id } = req.params;
    const numberOfCategories = await pool.query("SELECT COUNT(*) AS category_number FROM categorie where id_user =$1", [id]);
    res.json(numberOfCategories.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Une erreur s'est produite lors de la selection des categories." });
  }
}
