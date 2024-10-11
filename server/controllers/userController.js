const pool=require('../db');
const bcrypt=require("bcrypt");

exports.getUser=async(req,res)=> {
    try {
        const { id } = req.params;
        const selectedUser = await pool.query(
          "SELECT * FROM utilisateur WHERE id_user = $1",
          [id]
        );
        if (selectedUser.rows.length === 0) {
          return res.status(404).json({ error: 'User non trouvée' });
        }
        res.json(selectedUser.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la récupération des données d'utilisateur" });
        
    }
}

exports.updateUser= async(req,res) => {
    try {
        const {id}=req.params;
        const {username,email}=req.body;
        const updatedUser = await pool.query("UPDATE utilisateur SET username=$1,email=$2 WHERE id_user=$3",
            [username,email,id]
        );
        res.json(updatedUser);
    } catch (err) {
        console.log(err)
    }
}
exports.updatePwd= async(req,res)=> {
    try {
        const {email,mdp, newMdp, id_user}=req.body;
        const existedUser = await pool.query("SELECT *  FROM utilisateur WHERE email=$1",
         [email]
        );
        if(existedUser.rows.length === 0){
         return res.status(401).json("mdp ou email incorrect");
        }
        const validPassword = await bcrypt.compare(mdp,existedUser.rows[0].mdp);
        if(!validPassword){
         return res.status(401).json("mdp ou email incorrect");
        }
        const saltRounds =10;
        const salt= await bcrypt.genSalt(saltRounds); //generer un salt aleatoire(salt --> element aleatoire ajouté au mdp avant de hacher)
        const bcryptPassword= await bcrypt.hash(newMdp,salt); 
        const updatedUserpW = await pool.query("UPDATE utilisateur SET mdp=$1 WHERE id_user=$2",
            [bcryptPassword, id_user]
        );
        res.json({existedUser, updatedUserpW});
        } catch (err) {
         console.log(err)
     }
}