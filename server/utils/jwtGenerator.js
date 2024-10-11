const jwt = require("jsonwebtoken"); //importation du biblio jwt --> permettant de verifier les tokens jwt
require("dotenv").config();
//charge les variables d'environnement définies dans le fivhier ".env" dans l'env d'execution du programme.

function jwtGenerator(user_id){ //generer le token jwt
    const payload ={
        user : user_id  // la variable payload contient les données à inclure dans le token JWT
    }

   return jwt.sign(payload, process.env.jwtSecret,{expiresIn: "1hr" })
// la methode sign est une methode de biblio JWT pour generer le tocken JWT en passant les variables (données inclure,cle secret du jwt(.env),durée dexpiration)
}

module.exports=jwtGenerator;
