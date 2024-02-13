// Importe l'instance du pool de connexions à la base de données depuis le fichier 'pool.js' local.
// Ce pool est utilisé pour gérer et optimiser les connexions à la base de données,
// facilitant les requêtes et les transactions dans le DataMapper.
const pool = require('./pool');

// Initialisation à la connexion à la base de données
const categoryDatamapper = {
  /**
   * Méthode: récupérer toutes les catégories de la base de données
   * @returns retourne tout les catégories
   */
  async findAll() {
    const sqlQuery = 'SELECT * FROM "category"';
    const results = await pool.query(sqlQuery);
    return results.rows;
  },
  /**
   * Méthode: récupérer une catégorie de la BDD par son ID
   * @param {number} id id de la catégorie
   * @returns retourne une catégorie par son id
   */
  async findById(id) {
    const sqlQuery = 'SELECT * FROM "category" WHERE id = $1';
    const values = [id];
    const results = await pool.query(sqlQuery, values);
    return results.rows;
  },
};

module.exports = categoryDatamapper;
