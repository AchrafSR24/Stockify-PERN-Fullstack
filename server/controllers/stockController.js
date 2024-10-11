const pool=require('../db');



//add to stock :
exports.addToStock= async (req,res)=>{
  try {
    const {id_prod,qte_stock} = req.body;
    const newStock = await pool.query(
      "INSERT INTO stock (id_prod,qte_stock,seuil_stock) VALUES($1,$2,$3) RETURNING *",
      [id_prod,qte_stock,10]
    );
    res.json(newStock.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l ajout de produit au stock' });
  }
}


//visualiser le Stock actuel : 

exports.showActualStock = async (req, res) => {
    try {
      const actualStockList = await pool.query(`
        SELECT 
         *
        FROM stock s
        JOIN produit p ON s.id_prod = p.id_prod
        JOIN categorie c ON p.id_categorie = c.id_categorie
      `);
      res.json(actualStockList.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la récupération du stock' });
    }
  };




//mettre a jour qte en stock pour chaque produit:

exports.updateStockProduct= async(req,res) => {
    try {
        const {id}=req.params;
        const {qte_stock,seuil_stock}=req.body;
        const updatedStockProduct = await pool.query("UPDATE stock SET qte_stock=$1,seuil_stock=$2 WHERE id_stock=$3",
            [qte_stock,seuil_stock,id]
        );
        res.json(updatedStockProduct);
    } catch (err) {
        console.log(err)
    }
}

// Récupérer un stock
exports.getStock = async (req, res) => {
  try {
    const { id } = req.params;
    const selectedStock = await pool.query(
      "SELECT * FROM stock WHERE id_stock = $1",
      [id]
    );
    if (selectedStock.rows.length === 0) {
      return res.status(404).json({ error: 'Stock non trouvée' });
    }
    res.json(selectedStock.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération du stock' });
  }
};
exports.getStockNumber = async(req,res)=> {
  try {
    const { id } = req.params;
    const numberOfStock = await pool.query("SELECT COUNT(*) AS stock_number FROM stock where id_user =$1", [id]);
    res.json(numberOfStock.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Une erreur s'est produite lors de la selection de stock." });
  }
}
