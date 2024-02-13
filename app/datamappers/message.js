// eslint-disable-next-line no-unused-vars
const debug = require('debug')('sensibd:message-datamapper');
// Importe l'instance du pool de connexions à la base de données depuis le fichier 'pool.js' local.
// Ce pool est utilisé pour gérer et optimiser les connexions à la base de données,
// facilitant les requêtes et les transactions dans le DataMapper.
const pool = require('./pool');

// Initialisation à la connexion à la base de données
const messageDatamapper = {
  /**
   * Méthode: récupérer tous les messages liés à un post entre deux utilisateurs
   * @param {number} postId id de l'annonce
   * @param {number} senderId id du destinateur du message
   * @param {number} receiverId id du destinataire du message
   * @returns retourne tout les messages de la conversation
   */
  async findAll(postId, senderId, receiverId) {
    const sqlQuery = `
    SELECT
      "message"."id",
      "message"."content",
      "message"."created_at",
      "message"."updated_at",
      "message"."post_id",
      "message"."sender_id",
      "message"."receiver_id",
      "user"."id" AS "user_id",
      "user"."firstname",
      "user"."lastname",
      "user"."pseudonym",
      "user"."email",
      "user"."avatar",
      "user"."score"
    FROM "message"
    INNER JOIN "user" ON "user"."id" = "message"."sender_id"
    WHERE "message"."post_id" = $1
    AND (
      ("message"."sender_id" = $2 AND "message"."receiver_id" = $3)
      OR
      ("message"."sender_id" = $3 AND "message"."receiver_id" = $2)
    )
    ORDER BY "message"."created_at" ASC;`;
    const values = [postId, senderId, receiverId];
    const results = await pool.query(sqlQuery, values);
    return results.rows;
  },
  /**
   * Méthode pour poster un message à un autre utilisateur
   * @param {number} postId id de l'annonce
   * @param {number} senderId id du destinateur du message
   * @param {number} receiverId id du destinataire du message
   * @param {string} content contenu du message à envoyer
   * @returns retourne le message envoyé
   */
  async add(postId, senderId, receiverId, content) {
    const sqlQuery = `
      INSERT INTO "message" ("content", "sender_id", "receiver_id", "post_id")
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [content, senderId, receiverId, postId];
    const result = await pool.query(sqlQuery, values);
    return result.rows[0];
  },
  /**
   * Méthode pour récupérer une liste de toutes les conversations d'un utilisateur
   * @param {number} userId id de l'utilisateur authentifié
   * @returns retourne la liste des derniers messages de chaque conversations
   */
  async getConversationsForUser(userId) {
    const sqlQuery = `
    WITH RankedMessages AS (
      SELECT
          "message"."id",
          "message"."post_id",
          "message"."sender_id",
          "message"."receiver_id",
          "message"."created_at",
          "user_sender"."pseudonym" AS "sender_pseudonym",
          "user_receiver"."pseudonym" AS "receiver_pseudonym",
          "post"."post_title",
          ROW_NUMBER() OVER (
              PARTITION BY "message"."post_id"
              ORDER BY "message"."created_at" DESC
          ) AS rn
      FROM
          "message"
      INNER JOIN "user" AS "user_sender" ON "user_sender"."id" = "message"."sender_id"
      INNER JOIN "user" AS "user_receiver" ON "user_receiver"."id" = "message"."receiver_id"
      INNER JOIN "post" ON "post"."id" = "message"."post_id"
      WHERE
          "message"."sender_id" = $1 OR "message"."receiver_id" = $1
    )
    SELECT
        "post_id",
        "sender_id",
        "receiver_id",
        "sender_pseudonym",
        "receiver_pseudonym",
        "post_title",
        "created_at" AS "last_message_time"
    FROM
        RankedMessages
    WHERE
        rn = 1
    ORDER BY
        "last_message_time" DESC;`;
    const values = [userId];
    const results = await pool.query(sqlQuery, values);
    return results.rows;
  },
};

module.exports = messageDatamapper;
