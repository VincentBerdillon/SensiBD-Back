// Importation du module debug
const debug = require('debug')('sensibd:pool');
// Importation de dotenv
require('dotenv').config();
// Importation du module pg
const { Pool } = require('pg');
// Création d'une instance de Pool
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
// Création d'une variable pour compter le nombre de requêtes
let queryCount = 0;
// Exportation d'un objet qui contient une propriété query qui est une fonction
module.exports = {
  // Je stocke l'instance de Pool dans une propriété originalClient
  originalClient: pool,
  // Je définis une propriété query qui est une fonction
  async query(...params) {
    // J'incrémente le compteur de requêtes
    queryCount += 1;
    // J'affiche le nombre de requêtes
    debug(`Req n°${queryCount}`);
    // J'affiche la requête
    return this.originalClient.query(...params);
  },
};
