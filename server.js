/** ************************************ */
/** * Fichier de lancement du serveur ** */
/** ************************************ */
/* eslint-disable */
// Importation du module rate-limit
const {
  rateLimit,
} = require('express-rate-limit');
// Importation du module CORS
const cors = require('cors');
// Importation du module dotenv
require('dotenv').config();
// Importation du module debug
const debug = require('debug')('sensibd:server');
// Importation du module path
// const path = require('path');
// Importation du module express
const express = require('express');
// Importation de Express-JSDOC-swagger pour la documentation
const expressJSDocSwagger = require('express-jsdoc-swagger');
// Importation du router
const router = require('./app/routers');

// Définition du port d'écoute du serveur
const PORT = process.env.PORT;

// Configuration de express-jsdoc-swagger
const options = {
  info: {
    version: '1.0.0',
    title: 'Sensi-BD-API',
    license: {
      name: 'MIT',
    },
  },
  // Base directory which we use to locate your JSDOC files
  baseDir: `${__dirname}/app/routers`,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: './**/*.js',
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api-docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
};

// Création de l'application express
const app = express();

// Appel de express-jsdoc-swagger
expressJSDocSwagger(app)(options);

// Autorise la réception de données au format (Content-type) JSON
app.use(express.json());

// Autorise les requêtes cross-origin, à limiter au déploiement
app.use(cors(''));

// limite le nombre de reqêtes pour éviter les attaques brute force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Définition du dossier public
app.use(express.static('public'));
// Autorise la réception de données au format (Content-type) x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true,
}));

// Définition du moteur de rendu
app.use(router);

// Je lance l'écoute de mon serveur
app.listen(PORT, () => debug(`Serveur démarré http://localhost:${PORT}`));
debug('PGUSER:', process.env.PGUSER);
debug('PGPASSWORD:', process.env.PGPASSWORD);