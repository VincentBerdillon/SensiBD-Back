// Importation du categoryDatamapper
const { categoryDatamapper } = require('../datamappers');

// Objet: regroupe tous les controleurs des categories
const categoryController = {
  // Méthode pour récupérer toutes les categories
  async getAllCategories(_, res) {
    // Appel de findAll pour obtenir toutes les categories
    const categories = await categoryDatamapper.findAll();
    // Envoi de la réponse au format JSON avec les categories
    res.json(categories);
  },
  async getCategoryById(req, res) {
    // Récupération de l'id de la categorie
    const categories = await categoryDatamapper.findById(req.params.id);
    // Envoi de la réponse au format JSON
    res.json(categories);
  },
};

// Exportation du controleur des categories
module.exports = categoryController;
