// Importe l'instance du pool de connexions à la base de données depuis le fichier 'pool.js' local.
// Ce pool est utilisé pour gérer et optimiser les connexions à la base de données,
// facilitant les requêtes et les transactions dans le DataMapper.
const pool = require('./pool');

// Initialisation à la connexion à la base de données
const conditionDatamapper = {
  /**
   * Méthode: récupérer toutes les conditions (états des ouvrages) de la base de données
   * @returns retourne tous les états des ouvrages
   */
  async findAll() {
    const sqlQuery = 'SELECT * FROM "condition"';
    const results = await pool.query(sqlQuery);
    return results.rows;
  },
  /**
   * Méthode: récupérer une condition (état de l'ouvrage) de la BDD par son ID
   * @param {number} id id de l'état de l'ouvrage
   * @returns retourne un état de l'ouvrage par son id
   */
  async findById(id) {
    const sqlQuery = 'SELECT * FROM "condition" WHERE id = $1';
    const values = [id];
    const results = await pool.query(sqlQuery, values);
    return results.rows;
  },
};

module.exports = conditionDatamapper;
