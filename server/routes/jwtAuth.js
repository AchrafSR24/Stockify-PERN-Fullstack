const router = require("express").Router();
const pool=require("../db");
const bcrypt=require("bcrypt");
const jwtGenerator=require("../utils/jwtGenerator");
//signUP:
router.post("/signup", async(req,res)=>{
    try {
       //1.destructure the req.body --> envoyer les données
        const {username,mdp,email}=req.body;

        const user =await pool.query("SELECT * FROM utilisateur WHERE email=$1",
            [email]);
        
        //2.check if user exist (if user exist then throw error)
        
        if (user.rows.length !==0) {
            return res.status(401).send("utilisateur est deja existant")
        }   
        //3.Bcrypt the user password

        const saltRounds =10;
        const salt= await bcrypt.genSalt(saltRounds); //generer un salt aleatoire(salt --> element aleatoire ajouté au mdp avant de hacher)
        const bcryptPassword= await bcrypt.hash(mdp,salt); //hachage du mdp
        
        //4.enter the new user inside the DB

        const newUser= await pool.query("INSERT INTO utilisateur(username,mdp,email) VALUES($1,$2,$3) RETURNING *",
            [username,bcryptPassword,email]
        );
        
        

        //5.generating the JWT token:
        console.log(newUser.rows[0].id_user)
        //const token = jwtGenerator(newUser.rows[0].id_user);
        res.json({newUser});

        
    } catch (err) {
        console.log(err);
    }
});


//login :

router.post("/login", async(req,res)=> {
    try {
       //1. destructure the req.body 
       const {email,mdp}=req.body;

       //2. check user not exist (if not then we throw error)
       const existedUser = await pool.query("SELECT *  FROM utilisateur WHERE email=$1",
        [email]
       );
       if(existedUser.rows.length === 0){
        return res.status(401).json("mdp ou email incorrect");
       }
       //3. check if input password === db password
       
      
       const validPassword = await bcrypt.compare(mdp,existedUser.rows[0].mdp);
       if(!validPassword){
        return res.status(401).json("mdp ou email incorrect");
       }

       //4.give them the jwt token
        const token= jwtGenerator(existedUser.rows[0].id_user);
       res.json({ token , existedUser});
      
    } catch (err) {
        console.log(err)
    }
})
        

module.exports =router;