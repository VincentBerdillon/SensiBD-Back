/* eslint-disable */
// Import de JWT
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET

module.exports = {
  /**
   * Fonction de génération de token JWT
   * @param {Object} userData les infos d'un utilisateur enregistré
   * @returns un token JWT valide
   */
  generateTokenForUser(userData) {
    // Utilisation de la méthode sign de JWT pour créer un nouveau token
    return jwt.sign(
      // Assignation d'informations lié à l'utilisateur dans son token
      {
        userId: userData.id,
        role: userData.role_id,
        score: userData.score,
      },
      // Clé secrète de signature de token
      JWT_SIGN_SECRET,
      // Assignation d'un durée d'expiration du token
      {
        expiresIn: '1h',
      },
    );
  },
};