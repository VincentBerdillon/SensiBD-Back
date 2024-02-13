// Importation du module express
const express = require('express');
// Importation du controleur userController
const {
  userController,
} = require('../controllers');
// Importation de controllerHandler
const controllerHandler = require('../controllers/helpers/controllerHandler');
// Importation de ApiError
const ApiError = require('../errors/ApiError');
// Importation de errorHandler
const errorHandler = require('../controllers/helpers/errorHandler');
// Import du middleware JWT
const auth = require('../utils/authToken');
// Importation du module sanitizer
const bodySanitizer = require('../middlewares/bodyMiddleware');

// Création du router
const router = express.Router();

// Définition des routes
/**
 * GET /users
 * @summary retourne une liste d'utilisateurs
 * @return {object} 200 - Success response
 */
router.get('/', controllerHandler(userController.getAllUsers));

/**
 * GET /users/{id}
 * @summary retourne les informations d'un utilisateur authentifié
 * @param {number} id.path.required - l'id de l'utilisateur authentifié
 * @return {object} 200 - Success response
 */
router.get('/:id', auth, controllerHandler(userController.getUserById));

/**
 * POST /users
 * @summary ajout d'un utilisateur en base de donnée
 * @param {object} request.body.required - les informations de l'utilisateur
 * @property {string} firstname - prénom de l'utilisateur
 * @property {string} lastname - nom de l'utilisateur
 * @property {string} pseudonym - pseudo de l'utilisateur
 * @property {string} email - email de l'utilisateur
 * @property {string} password - mot de passe de l'utilisateur
 * @property {string} address - adress de l'utilisateur
 * @property {string} number - numéro de rue
 * @property {string} street - nom de la rue
 * @property {string} zipcode - numéro de code postal
 * @property {string} city - nom de la ville
 * @property {string} country - nom du pays
 * @property {number} latitude - la latitude de l'adresse
 * @property {number} longitude - la longitude de l'adresse
 * @return {object} 200 - Success response
 */
router.post('/', bodySanitizer, controllerHandler(userController.addUser));

/**
 * POST /users/login
 * @summary demande d'authentification d'un utilisateur
 * @param {object} request.body.required - les informations du formulaire de login
 * @property {string} email - email de l'utilisateur
 * @property {string} password - mot de passe de l'utilisateur
 * @return {object} 200 - Success response
 */
router.post('/login', bodySanitizer, controllerHandler(userController.loginUser));

/**
 * PATCH /users/{id}
 * @summary modification du profil d'un utilisateur authentifié
 * @param {number} id.path.required - l'id de l'utilisateur authentifié
 * @param {object} request.body.required - les informations de l'utilisateur
 * @property {string} firstname - prénom de l'utilisateur
 * @property {string} lastname - nom de l'utilisateur
 * @property {string} pseudonym - pseudo de l'utilisateur
 * @property {string} email - email de l'utilisateur
 * @property {string} password - mot de passe de l'utilisateur
 * @return {object} 200 - Success response
 */
router.patch('/:id', auth, controllerHandler(userController.updateUser));

/**
 * DELETE /users/{id}
 * @summary suppression du compte d'un utilisateur authentifié
 * @param {number} id.path.required - l'id de l'utilisateur authentifié
 * @return {object} 200 - Success response
 */
router.delete('/:id', auth, controllerHandler(userController.deleteUser));

/**
 * PATCH /users/{id}/address
 * @summary mise à jour de l'adresse d'un utilisateur
 * @param {number} id.path.required - l'id de l'utilisateur authentifié
 * @param {object} request.body.required - les informations de l'utilisateur
 * @property {string} address - adress de l'utilisateur
 * @property {string} number - numéro de rue
 * @property {string} street - nom de la rue
 * @property {string} zipcode - numéro de code postal
 * @property {string} city - nom de la ville
 * @property {string} country - nom du pays
 * @property {number} latitude - la latitude de l'adresse
 * @property {number} longitude - la longitude de l'adresse
 * @return {object} 200 - Success response
 */
router.patch('/:id/address', auth, controllerHandler(userController.updateUserAddress));

// Middleware pour gérer les routes qui ne correspondent à aucune route définie ci-dessus.
router.use(() => {
  throw new ApiError('Resource not found', 404);
});

// Middleware pour la gestion des erreurs.
router.use(errorHandler);

// Exportation du router
module.exports = router;