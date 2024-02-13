// Importation du datamapper audienceDatamapper
const { audienceDatamapper } = require('../datamappers');

// Objet: regroupe tous les controleurs des audiences
const audienceController = {
  // Méthode pour récupérer toutes les audiences
  async getAllAudiences(_, res) {
    // Appel de findAll pour obtenir toutes les audiences
    const audiences = await audienceDatamapper.findAll();
    // Envoi de la réponse au format JSON avec les audiences
    res.json(audiences);
  },
};

// Exportation du controleur des audiences
module.exports = audienceController;
