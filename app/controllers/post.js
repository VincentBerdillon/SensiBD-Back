// Importation du module debug
const debug = require('debug')('sensibd:post-controller');
// Importation du postDatamapper
const { postDatamapper } = require('../datamappers');

// const s3Service = require('../utils/s3Service');

// Objet: regroupe tous les controleurs des posts
const postController = {
  // Méthode: récupérer tous les posts avec pagination
  async getAllPosts(req, res) {
    /* Récupération du numéro de page à partir des paramètres de requête,
    avec une valeur par défaut de 1 */
    const page = req.query.page || 1;
    // Appel de findAll avec le numéro de page pour obtenir les posts paginés
    const posts = await postDatamapper.findAll(page);
    // Envoi de la réponse au format JSON avec les posts
    res.json(posts);
  },
  // Méthode: récupérer un post par son id
  async getPostById(req, res) {
    // Récupération de l'id du post
    const posts = await postDatamapper.findById(req.params.id);
    // Envoi de la réponse au format JSON
    res.json(posts);
  },
  // Méthode: récupérer des post correspondant aux critères de recherche
  async getPostByCity(req, res) {
    /* Récupération du numéro de page à partir des paramètres de requête,
    avec une valeur par défaut de 1 */
    const page = req.query.page || 1;
    const criteria = req.query;
    // Extraction de la clé et de la valeur
    const [key] = Object.keys(criteria);
    const value = criteria[key];

    debug('page:', page);
    debug('criteria:', criteria);
    debug('value:', value);

    // Appel du datamapper avec la clé, la valeur et le numero de page
    const posts = await postDatamapper.findByCity(value, page);

    res.json(posts);
  },
  // Méthode: récupérer un post par sa catégorie
  async getPostByCategory(req, res) {
    /* Récupération du numéro de page à partir des paramètres de requête,
    avec une valeur par défaut de 1 */
    const page = req.query.page || 1;
    // Appel de findByCategory avec le numéro de page pour obtenir les posts paginés
    const posts = await postDatamapper.findByCategory(req.params.id, page);
    // Envoi de la réponse au format JSON avec les posts
    res.json(posts);
  },
  // Méthode: récupérer tous les posts par audience avec pagination
  async getPostByAudience(req, res) {
    /* Récupération du numéro de page à partir des paramètres de requête,
    avec une valeur par défaut de 1 */
    const page = req.query.page || 1;
    // Appel de findByAudience avec le numéro de page pour obtenir les posts paginés
    const posts = await postDatamapper.findByAudience(req.params.id, page);
    // Envoi de la réponse au format JSON avec les posts
    res.json(posts);
  },
  // Méthode: récupérer tous les posts par condition avec pagination
  async getPostByCondition(req, res) {
    /* Récupération du numéro de page à partir des paramètres de requête,
    avec une valeur par défaut de 1 */
    const page = req.query.page || 1;
    // Appel de findByCondition avec le numéro de page pour obtenir les posts paginés
    const posts = await postDatamapper.findByCondition(req.params.id, page);
    // Envoi de la réponse au format JSON avec les posts
    res.json(posts);
  },
  // Méthode: créer un post avec upload d'image
  async addPost(req, res) {
    try {
      // // ... logique pour gérer l'upload de fichier
      // const { file } = req; // Le fichier uploadé
      // const signedUrl = await s3Service.uploadFileToS3(file);

      // Créer l'objet post avec l'URL présignée
      const post = {
        ...req.body, // Autres propriétés du post
        // image: signedUrl, // Utiliser l'URL présignée pour la propriété 'image'
      };

      // Appeler la méthode add du postDatamapper
      const newPost = await postDatamapper.add(post);
      res.json(newPost);
    } catch (error) {
      // Gérer l'erreur
      res.status(500).send(error.message);
    }
  },
  // Méthode: modifier un post selon son id
  async updatePost(req, res) {
    // Modification d'un post
    const post = await postDatamapper.update(req.params.id, req.body);
    // Envoi de la réponse au format JSON
    res.json(post);
  },
  // Méthode: supprimer un post selon son id
  async deletePost(req, res) {
    // Suppression d'un post
    const post = await postDatamapper.delete(req.params.id);
    // Envoi de la réponse au format JSON
    res.json(post);
  },
};

// Exportation du controleur des posts
module.exports = postController;
