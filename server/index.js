const express = require("express"); //importation du express
// pour l'upload des images
const app = express(); //creation d'une instance d'une app express
const cors = require("cors");
/*  Cette ligne importe le module cors,
 qui est un middleware Express permettant de
 gérer les requêtes Cross-Origin Resource Sharing
  (CORS). CORS est un mécanisme de sécurité qui 
  restreint les requêtes HTTP provenant 
  de ressources externes.
*/
const pool=require("./db"); // importer(require) le fichier db.js

//middleware 
app.use(cors()); //utiliser cors en express app
app.use(express.json()) //Cela permet à notre application de traiter les données JSON envoyées dans les requêtes HTTP. //req.body




                                                      //ROUTES//

//login + signup routes:
app.use("/auth",require("./routes/jwtAuth"));                                                     

//-------------------------------------------------------PRODUIT----------------------------------------------------------------------------//
 
app.use("/products", require("./routes/product")); 

//-------------------------------------------------------CATEGORIE----------------------------------------------------------------------------//

app.use("/categories", require("./routes/category"));

//-------------------------------------------------------ENTREPOT---------------------------------------------------------------------------//

app.use("/warehouses", require("./routes/warehouse"));

//-------------------------------------------------------STOCK------------------------------------------------------------------------------//

app.use("/stock", require("./routes/stock"));
//--------------------------------------------------------USER--------------------------------------------------------------------------------//
app.use("/users",require("./routes/user"));

app.listen(5000 , ()=> { //demarrer le serveur express et ecouter sur le port "message de validation"
    console.log("server has started on port 5000");
});// syntaxe : app.listen(port_localhost , fct execute lorsque on demarre lapplication)



