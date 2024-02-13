-- Verify sensi-bd:02-default-fk on pg

BEGIN;

-- Insertion d'un nouvel utilisateur sans spécifier role_id
INSERT INTO "user" (address_id, firstname, lastname, pseudonym, email, password)
VALUES (1, 'Test', 'User', 'testuser', 'test@example.com', 'password123');

-- Sélection du role_id du dernier utilisateur inséré
SELECT "role_id" FROM "user" ORDER BY "id" DESC LIMIT 1;

ROLLBACK;
