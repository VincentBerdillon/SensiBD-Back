// Importation du module express
const express = require('express');
// Importation du controleur categoryController
const { categoryController } = require('../controllers');
// Création du router
const router = express.Router();

// Définition des routes
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// Exportation du router
module.exports = router;
