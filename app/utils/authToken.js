/* eslint-disable */
// Import de JWT
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET

module.exports = (req, res, next) => {
  try {
    // Récupération du token dans le header du req, en séparant le Bearer du token
    const token = req.headers.authorization.split(' ')[1];
    // Utilisation de la méthode verify de JWT pour vérifier la validité du token
    const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
    // Récupération du userId depuis le header du token pour l'utiliser dans des méthodes
    const {
      userId
    } = decodedToken;
    req.auth = {
      userId,
    };
    next();
  } catch (error) {
    res.status(401).json({
      error: 'Token invalide'
    });
  }
};