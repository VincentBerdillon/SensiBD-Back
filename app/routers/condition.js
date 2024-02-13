// Importation du module express
const express = require('express');
// Importation du controleur conditionController
const { conditionController } = require('../controllers');
// Création du router
const router = express.Router();

// Définition des routes
router.get('/', conditionController.getAllConditions);
router.get('/:id', conditionController.getConditionById);

// Exportation du router
module.exports = router;
