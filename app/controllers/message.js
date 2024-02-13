// Importation du module debug
const debug = require('debug')('sensibd:user-controller');
// Importation du module messageController
const { messageDatamapper } = require('../datamappers');

// Objet: regroupe tous les controleurs des messages
const messageController = {
  // Méthode pour récupérer tous les messages liés à un post entre deux utilisateurs
  async getMessagesByPostAndUser(req, res) {
    debug('User authentifié:', req.auth);
    // L'ID du destinataire est passé en paramètre dans l'URL
    const { postId, userId: receiverId } = req.params;
    // L'ID de l'expéditeur est récupéré depuis la session ou le token JWT
    const senderId = req.auth.userId;
    // Appel de findAll pour obtenir tous les messages
    const messages = await messageDatamapper.findAll(postId, senderId, receiverId);
    // Envoi de la réponse au format JSON avec les messages
    res.json(messages);
  },
  // Méthode pour créer un message
  async addMessage(req, res) {
    debug('User authentifié:', req.auth);
    // L'ID du destinataire est passé en paramètre dans l'URL
    const { postId, userId: receiverId } = req.params;
    // L'ID de l'expéditeur est récupéré depuis la session ou le token JWT
    const senderId = req.auth.userId;
    // Création d'un message
    const { content } = req.body;
    const message = await messageDatamapper.add(postId, senderId, receiverId, content);
    // Envoi de la réponse au format JSON avec le message
    res.json(message);
  },
  async getConversations(req, res) {
    debug('User authentifié:', req.auth);
    // L'ID de l'utilisateur est récupéré depuis le token JWT
    const { userId } = req.auth;
    // Appel de getConversationsForUser pour obtenir toutes les conversations de l'utilisateur
    const conversations = await messageDatamapper.getConversationsForUser(userId);
    // Envoi de la réponse au format JSON avec les conversations
    res.json(conversations);
  },
};

// Exportation du controleur des messages
module.exports = messageController;
