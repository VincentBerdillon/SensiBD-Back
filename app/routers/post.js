// Importation du module express
const express = require('express');
// Importation du controleur postController
const {
  postController,
} = require('../controllers');
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
/**
 * GET /posts
 * @summary retourne une liste d'annonces
 * @param {number} page.query - le numero de la page
 * @return {object} 200 - Success response
 */
router.get('/', controllerHandler(postController.getAllPosts));

/**
 * GET /posts/find
 * @summary retourne une liste d'annonces trié par ville du propriétaire de l'annonce
 * @param {string} city.query.required - le nom de la ville des annonces
 * @param {number} page.query - le numero de la page
 * @return {object} 200 - Success response
 */
router.get('/find', controllerHandler(postController.getPostByCity));

/**
 * GET /posts/{id}
 * @summary retourne une annonce en fonction d'un id
 * @param {number} id.path.required - l'id de l'annonce
 * @return {object} 200 - Success response
 */
router.get('/:id', controllerHandler(postController.getPostById));

/**
 * GET /posts/category/{id}
 * @summary retourne une liste d'annonces trié par catégorie
 * @param {number} id.path.required - l'id de la catégorie
 * @return {object} 200 - Success response
 */
router.get('/category/:id', controllerHandler(postController.getPostByCategory));

/**
 * GET /posts/audience/{id}
 * @summary retourne une liste d'annonces trié par tranche d'audience
 * @param {number} id.path.required - l'id de l'audience
 * @return {object} 200 - Success response
 */
router.get('/audience/:id', controllerHandler(postController.getPostByAudience));

/**
 * GET /posts/condition/{id}
 * @summary retourne une liste d'annonces trié par état d'usure
 * @param {number} id.path.required - l'id de l'était d'usure
 * @return {object} 200 - Success response
 */
router.get('/condition/:id', controllerHandler(postController.getPostByCondition));

/**
 * POST /posts
 * @summary ajoute une annonce sur le site par un utilisateur authentifié
 * @param {object} request.body.required - les informations de l'annonce
 * @property {string} post_title - titre de l'annonce
 * @property {string} slug - slug de l'annonce
 * @property {string} description - description de l'annonce
 * @property {string} image - image de l'annonce
 * @property {string} book_title - titre du l'oeuvre de l'annonce
 * @property {string} book_author - nom de l'auteur de l'oeuvre de l'annonce
 * @property {number} user_id - id de l'utilisateur qui poste l'annonce
 * @property {number} category_id - id de la catégorie de l'annonce
 * @property {number} audience_id - id de l'audience cible de l'annonce
 * @property {number} condition_id - id de l'état d'usur de l'oeuvre de l'annonce
 * @return {object} 200 - Success response
 */
router.post('/', auth, controllerHandler(postController.addPost));

/**
 * PUT /posts/{id}
 * @summary mise à jour d'une annonce par un utilisateur authentifié
 * @param {number} id.path.required - l'id de l'annonce
 * @param {object} request.body.required - les nouvelles informations de l'annonce
 * @property {string} post_title - titre de l'annonce
 * @property {string} slug - slug de l'annonce
 * @property {string} description - description de l'annonce
 * @property {string} image - image de l'annonce
 * @property {string} book_title - titre du l'oeuvre de l'annonce
 * @property {string} book_author - nom de l'auteur de l'oeuvre de l'annonce
 * @property {number} user_id - id de l'utilisateur qui poste l'annonce
 * @property {number} category_id - id de la catégorie de l'annonce
 * @property {number} audience_id - id de l'audience cible de l'annonce
 * @property {number} condition_id - id de l'état d'usur de l'oeuvre de l'annonce
 * @return {object} 200 - Success response
 */
router.put('/:id', auth, controllerHandler(postController.updatePost));
router.delete('/:id', auth, controllerHandler(postController.deletePost));

// Middleware pour gérer les routes qui ne correspondent à aucune route définie ci-dessus.
router.use(() => {
  throw new ApiError('Resource not found', 404);
});

// Middleware pour la gestion des erreurs.
router.use(errorHandler);

// Exportation du router
module.exports = router;