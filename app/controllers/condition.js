// Importation du modèle conditionDatamapper
const { conditionDatamapper } = require('../datamappers');

// Objet: regroupe tous les controleurs des conditions
const conditionController = {
  // Méthode pour récupérer toutes les conditions
  async getAllConditions(_, res) {
    // Appel de findAll pour obtenir toutes les conditions
    const conditions = await conditionDatamapper.findAll();
    // Envoi de la réponse au format JSON avec les conditions
    res.json(conditions);
  },
  // Méthode pour récupérer une condition par son id
  async getConditionById(req, res) {
    // Récupération de l'id de la condition
    const conditions = await conditionDatamapper.findById(req.params.id);
    // Envoi de la réponse au format JSON
    res.json(conditions);
  },
};

// Exportation du controleur des conditions
module.exports = conditionController;
