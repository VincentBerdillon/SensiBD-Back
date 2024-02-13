// Importation du module debug
const debug = require('debug')('sensibd:user-controller');
// Importation du validateur d'email
const validator = require('email-validator');
// Importation de bcrypt pour le hachage de MdP
const bcrypt = require('bcrypt');
// Importation de JWT
const jwtUtils = require('../utils/genToken');
// Importation du postDatamapper
const { userDatamapper } = require('../datamappers');

// Objet: regroupe tous les controleurs des posts
const userController = {
  // Méthode: récupérer tous les utilisateurs
  async getAllUsers(_, res) {
    // Récupération de tous les utilisateurs
    const users = await userDatamapper.findAll();
    // Envoi de la réponse au format JSON
    res.json(users);
  },
  // Méthode: récupérer un utilisateur
  async getUserById(req, res) {
    // Récupération d'un utilisateur
    const user = await userDatamapper.findById(req.params.id);
    // Envoi de la réponse au format JSON
    res.json(user);
  },
  // Méthode: Ajout d'un utilisateur
  async addUser(req, res) {
    // 1. Récupération des données du form
    const { body } = req;

    // 2. Vérification + hachage du MdP
    // - a. Vérification de la présence des infos
    if (!body.firstname || !body.lastname || !body.pseudonym || !body.email || !body.password) {
      res.status(400).json({
        error: "Toutes les informations nécessaires n'ont pas été transmises.",
      });
    }

    // - b. Vérification du format de l'email
    if (!validator.validate(body.email)) {
      res.status(400).json({
        error: "Cet email n'est pas valide.",
      });
    }

    // - c. Vérification de la présence de l'email en bdd
    const doesUserExist = await userDatamapper.checkUserExists(body.email);
    if (doesUserExist) {
      res.status(400).json({
        error: "Cet email n'est pas disponible.",
      });
    }

    // - d. Vérification si le mdp et sa confirmation sont identique
    if (body.password !== body.confirmPassword) {
      res.status(400).json({
        error: 'Le mot de passe et la confirmation ne correspondent pas.',
      });
    }

    // 3. Avant l'ajout du mdp en bdd, hashage du MdP
    const encryptedPassword = bcrypt.hashSync(body.password, 10);
    debug('Mot de Passe hashé:', encryptedPassword);

    const userData = {
      firstname: body.firstname,
      lastname: body.lastname,
      pseudonym: body.pseudonym,
      email: body.email,
      avatar: body.avatar,
      password: encryptedPassword,
    };

    // Envoi d'un utilisateur
    const addressId = await userDatamapper.addUserAddress(req.body);
    const newUser = await userDatamapper.addNewUser(userData, addressId);
    // Envoi du body en format JSON
    res.json(newUser);
  },
  // Méthode de login d'un utilisateur
  async loginUser(req, res) {
    // 1. Récupération des infos de connexion de puis le formulaire
    const { email, password } = req.body;

    // 2. Vérification de la présence de l'utilisateur en BDD
    const userFound = await userDatamapper.checkUserPseudoExists(email);
    if (!userFound) {
      res.status(400).json({
        error: 'Ce pseudonym ou ce mot de passe est incorrect !',
      });
    }

    // 3. Vérification de la validité du MdP
    const validPassword = bcrypt.compareSync(password, userFound.password);
    if (!validPassword) {
      res.status(400).json({
        error: 'Ce pseudonym ou ce mot de passe est incorrect !',
      });
    }

    // 4. Envoi de la réponse avec le token
    return res.status(200).json({
      pseudo: userFound.pseudonym,
      userId: userFound.id,
      isLogged: true,
      token: jwtUtils.generateTokenForUser(userFound),
    });
  },
  // Méthode de mise à jour des info d'un utilisateur
  async updateUser(req, res) {
    const user = await userDatamapper.update(req.auth.userId, req.body);
    res.json(user);
  },
  // Méthode de suppression d'un utilisateur
  async deleteUser(req, res) {
    const user = await userDatamapper.delete(req.auth.userId);
    res.json(user);
  },
  // Méthode de mise à jour des info de l'adresse d'un utilisateur
  async updateUserAddress(req, res) {
    debug('req.body:', req.body);
    const userAddressId = await userDatamapper.findAddressId(req.auth.userId);
    debug('User Address ID:', userAddressId);
    const newUserAddress = await userDatamapper.updateAddress(userAddressId, req.body);
    res.json(newUserAddress);
  },
};

// Exportation du controleur des posts
module.exports = userController;
