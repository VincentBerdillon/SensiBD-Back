// Importation du module express
const express = require('express');
// Importation du controleur audienceController
const { audienceController } = require('../controllers');
// Création du router
const router = express.Router();

// Définition des routes
router.get('/', audienceController.getAllAudiences);

// Exportation du router
module.exports = router;
