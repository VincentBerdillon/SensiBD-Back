-- Verify sensi-bd:06-default-score on pg

BEGIN;

-- Insertion d'un nouvel utilisateur sans spécifier le score
INSERT INTO "user" ("address_id", "role_id", "firstname", "lastname", "pseudonym", "email", "password")
VALUES (1, 1, 'Test', 'User', 'testuser2', 'test2@example.com', 'password123');

-- Sélection du score du dernier utilisateur inséré
SELECT "score" FROM "user" ORDER BY "id" DESC LIMIT 1;

ROLLBACK;
