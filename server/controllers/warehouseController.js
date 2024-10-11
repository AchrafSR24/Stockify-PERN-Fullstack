const pool = require("../db");

exports.addWarehouse = async (req, res) => {
  try {
    const { nom_entrepot, adresse, capacite ,id_user } = req.body;
    const newWarehouse = await pool.query(
      "INSERT INTO entrepot (nom_entrepot,adresse,capacite,id_user) values($1,$2,$3,$4)",
      [nom_entrepot, adresse, capacite,id_user]
    );
    res.json(newWarehouse.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Une erreur s'est produite lors de l'ajout de l'entrepôt." });
  }
};

exports.getAllWarehousesForUser = async (req, res) => {
  try {
    const { id }=req.params;
    const allWarehousesForUser = await pool.query("SELECT * FROM entrepot WHERE id_user = $1",[id]);
    res.json(allWarehousesForUser.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.getWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const selectedWarehouse = await pool.query(
      "SELECT * FROM entrepot WHERE id_entrepot=$1",
      [id]
    );
    res.json(selectedWarehouse.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération de l'entrepôt." });
  }
};

exports.getAllWarehouses = async (req, res) => {
  try {
    const allWarehouse = await pool.query("SELECT * FROM entrepot");
    res.json(allWarehouse.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération de tous les entrepôts." });
  }
};

exports.getAllNamesWarehouses = async (req, res) => {
  try {
    const { id } = req.params;
    const allNamesWarehouse = await pool.query("SELECT id_entrepot,nom_entrepot FROM entrepot where id_user=$1",[id]);
    res.json(allNamesWarehouse.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération de tous les noms d'entrepôts." });
  }
};

exports.deleteWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteWarehouse = await pool.query(
      "DELETE FROM entrepot WHERE id_entrepot=$1",
      [id]
    );
    res.json(deleteWarehouse);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Une erreur s'est produite lors de la suppression de l'entrepôt." });
  }
};

exports.updateWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom_entrepot, adresse, capacite } = req.body;
    const updatedWarehouse = await pool.query(
      "UPDATE entrepot SET nom_entrepot=$1, adresse=$2, capacite=$3 WHERE id_entrepot=$4 RETURNING *",
      [nom_entrepot, adresse, capacite, id]
    );
    res.json(updatedWarehouse.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour de l'entrepôt." });
  }
};
exports.getWarehousesNumber = async(req,res)=> {
  try {
    const { id } = req.params;
    const numberOfWarehouses = await pool.query("SELECT COUNT(*) AS warehouse_number FROM entrepot where id_user =$1", [id]);
    res.json(numberOfWarehouses.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Une erreur s'est produite lors de la selection des entrepôts." });
  }
}