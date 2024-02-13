const debug = require('debug')('sensibd:user-datamapper');
// Importe l'instance du pool de connexions à la base de données depuis le fichier 'pool.js' local.
// Ce pool est utilisé pour gérer et optimiser les connexions à la base de données,
// facilitant les requêtes et les transactions dans le DataMapper.
const pool = require('./pool');

// Initialisation à la connexion à la base de données
const userDatamapper = {
  /**
   * Méthode: récupérer tous les posts de la base de données
   * @returns retourne tout les posts
   */
  async findAll() {
    const sqlQuery = 'SELECT * FROM "user"';
    const results = await pool.query(sqlQuery);
    return results.rows;
  },
  /**
   * Méthode: récupérer un utilisateur de la BDD par son ID
   * @param {number} id id de l'utilisateur
   * @returns retourne un utilisateur
   */
  async findById(id) {
    const sqlQuery = `
    SELECT
      "user"."id",
      "user"."firstname",
      "user"."lastname",
      "user"."pseudonym",
      "user"."email",
      "user"."avatar",
      "user"."score",
      "address"."address",
      "address"."number",
      "address"."street",
      "address"."zipcode",
      "address"."city",
      "address"."country",
      "address"."latitude",
      "address"."longitude",
      json_agg(
        json_build_object(
          'post_id', "post"."id",
          'category_id', "post"."category_id",
          'audience_id', "post"."audience_id",
          'condition_id', "post"."condition_id",
          'post_title', "post"."post_title",
          'description', "post"."description",
          'book_title', "post"."book_title",
          'book_author', "post"."book_author",
          'image', "post"."image",
          'slug', "post"."slug"
        )
      ) AS posts
    FROM "user"
    LEFT JOIN "post" ON "post"."user_id" = "user"."id"
    LEFT JOIN "address" ON "user"."address_id" = "address"."id"
    WHERE "user"."id" = $1
    GROUP BY "user"."id", "address"."id", "address"."address", "address"."number", "address"."street", "address"."zipcode", "address"."city", "address"."country", "address"."latitude", "address"."longitude";`;
    const values = [id];
    const results = await pool.query(sqlQuery, values);
    return results.rows;
  },
  /**
   * Méthode ajouter l'adresse d'un utilisateur
   * @param {object} addressObj les infos de l'adresse de l'utilisateur
   * @returns retourne l'id de l'adresse ajouté
   */
  async addUserAddress(addressObj) {
    const values = [
      addressObj.address,
      addressObj.number,
      addressObj.street,
      addressObj.zipcode,
      addressObj.city,
      addressObj.country,
      addressObj.latitude,
      addressObj.longitude,
    ];
    const sqlQuery = `
    INSERT INTO "address"
      ("address", "number", "street", "zipcode", "city", "country", "latitude", "longitude")
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id;`;
    const results = await pool.query(sqlQuery, values);
    return results.rows[0].id;
  },
  /**
   * Méthode d'ajout d'un utilisateur
   * @param {object} userObj les infos de l'utilisateur
   * @param {id} addressId l'id de l'adresse de l'utilisateur ajouté précédement
   * @returns retourne les infos de l'utilisateur
   */
  async addNewUser(userObj, addressId) {
    const values = [
      userObj.firstname,
      userObj.lastname,
      userObj.pseudonym,
      userObj.email,
      userObj.avatar,
      userObj.password,
      addressId,
    ];
    const sqlQuery = `
      INSERT INTO "user"
        ("firstname", "lastname","pseudonym","email", "avatar", "password","address_id")
      VALUES
        ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;`;
    const results = await pool.query(sqlQuery, values);
    return results.rows[0];
  },
  /**
   * Méthode pour mettre à jour les infos d'un utilisateur
   * @param {id} id id de l'utilisateur
   * @param {object} userObj infos à mettre à jour pour l'utilisateur
   * @returns retourne les infos de l'utilisateur
   */
  async update(id, userObj) {
    const values = [
      userObj.firstname,
      userObj.lastname,
      userObj.pseudonym,
      userObj.email,
      userObj.avatar,
      userObj.password,
      id,
    ];
    const sqlQuery = `
    UPDATE "user"
    SET
      "firstname" = $1,
      "lastname" = $2,
      "pseudonym" = $3,
      "email" = $4,
      "avatar" = $5,
      "password" = $6,
      "updated_at" = now()
    WHERE "id" = $7
    RETURNING *;`;
    const results = await pool.query(sqlQuery, values);
    return results.rows;
  },
  /**
   * Méthode de suppression d'un utilisateur
   * @param {id} id id de l'utilisateur
   */
  async delete(id) {
    const sqlQuery = 'DELETE FROM "user" WHERE id = $1;';
    const values = [id];
    await pool.query(sqlQuery, values);
  },
  /**
   * Méthode de récupération de l'id de l'adresse de l'utilisateur
   * @param {*} userId id de l'utilisateur
   * @returns retourne l'id de l'adresse de l'utilisateur
   */
  async findAddressId(userId) {
    const sqlQuery = 'SELECT address_id FROM "user" WHERE id = $1';
    const values = [userId];
    const results = await pool.query(sqlQuery, values);
    return results.rows[0].address_id;
  },
  /**
   * Méthode de mise à jour de l'adresse d'un utilisateur
   * @param {id} userAddressId id de l'adresse de l'utilisateur
   * @param {object} userAddressObj info de l'adresse de l'utilisateur
   * @returns retourne de l'info de l'adresse de l'utilisateur
   */
  async updateAddress(userAddressId, userAddressObj) {
    const values = [
      userAddressObj.address,
      userAddressObj.number,
      userAddressObj.street,
      userAddressObj.zipcode,
      userAddressObj.city,
      userAddressObj.country,
      userAddressObj.latitude,
      userAddressObj.longitude,
      userAddressId,
    ];
    debug('values for sql update', values);
    const sqlQuery = `
      UPDATE "address"
      SET
        address = $1,
        number = $2,
        street = $3,
        zipcode = $4,
        city = $5,
        country = $6,
        latitude = $7,
        longitude = $8,
        updated_at = now()
      WHERE id = $9
      RETURNING *;`;
    const results = await pool.query(sqlQuery, values);
    return results.rows[0];
  },
  async checkUserExists(email) {
    const sqlQuery = 'SELECT * FROM "user" WHERE email = $1 LIMIT 1';
    const values = [email];
    const results = await pool.query(sqlQuery, values);
    if (results.rows.length > 0) {
      return true;
    }
    return false;
  },
  async checkUserPseudoExists(email) {
    const sqlQuery = 'SELECT * FROM "user" WHERE email = $1 LIMIT 1';
    const values = [email];
    const results = await pool.query(sqlQuery, values);
    if (results.rows.length > 0) {
      return results.rows[0];
    }
    return false;
  },
};

module.exports = userDatamapper;
