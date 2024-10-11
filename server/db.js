//importer le module pool du biblio pg permettant

const { host } = require("pg/lib/defaults");

// de gerer un pool de cnx a la BD.
const Pool = require("pg").Pool;

//creation d'une instance de pool + parametre de config
const pool = new Pool({
    user:"postgres",
    password:"123",
    host:'localhost',
    port : 5432,
    database : "stockify"
});
//exportation pour donner l'acces a importer dans les autres partie du code (index.js)
module.exports =pool;

