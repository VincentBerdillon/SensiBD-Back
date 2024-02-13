// Importation du module express
const express = require('express');
// Importation du controleur messageController
const { messageController } = require('../controllers');
// Importation de controllerHandler
const controllerHandler = require('../controllers/helpers/controllerHandler');
// Importation de ApiError
const ApiError = require('../errors/ApiError');
// Importation de errorHandler
const errorHandler = require('../controllers/helpers/errorHandler');
// Création du router
const router = express.Router();
// Import du middleware JWT
const auth = require('../utils/authToken');

// Définition des routes
router.get('/:postId/:userId', auth, controllerHandler(messageController.getMessagesByPostAndUser));
router.post('/:postId/:userId', auth, controllerHandler(messageController.addMessage));
router.get('/conversations', auth, controllerHandler(messageController.getConversations));

// Middleware pour gérer les routes qui ne correspondent à aucune route définie ci-dessus.
router.use(() => {
  throw new ApiError('Resource not found', 404);
});

// Middleware pour la gestion des erreurs.
router.use(errorHandler);

// Exportation du router
module.exports = router;
