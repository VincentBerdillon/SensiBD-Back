// Importe l'instance du pool de connexions à la base de données depuis le fichier 'pool.js' local.
// Ce pool est utilisé pour gérer et optimiser les connexions à la base de données,
// facilitant les requêtes et les transactions dans le DataMapper.
const pool = require('./pool');

// Initialisation à la connexion à la base de données
const audienceDatamapper = {
  /**
   * Méthode: récupérer tous les audiences de la base de données
   * @returns retourne tout les audiences
   */
  async findAll() {
    const sqlQuery = 'SELECT * FROM "audience"';
    const results = await pool.query(sqlQuery);
    return results.rows;
  },
};

module.exports = audienceDatamapper;
