// Objet: regroupe tous les datamappers
// Instanciation: const datamapper = require('./datamappers');
// const debug = require('debug')('app:datamappers');
// Importation du module pool
const postDatamapper = require('./post');
const userDatamapper = require('./user');
const categoryDatamapper = require('./category');
const audienceDatamapper = require('./audience');
const conditionDatamapper = require('./condition');
const messageDatamapper = require('./message');

module.exports = {
  postDatamapper,
  userDatamapper,
  categoryDatamapper,
  audienceDatamapper,
  conditionDatamapper,
  messageDatamapper,
};
