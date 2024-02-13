-- Verify sensi-bd:05-pwd-length-var on pg

BEGIN;

-- Ajout d'un utilisateur avec un mot de passe long
INSERT INTO "user" ("address_id", "role_id", "firstname", "lastname", "pseudonym", "email", "password")
VALUES (1, 1, 'Test', 'User', 'testuser', 'test@example.com',
        'un_très_long_mot_de_passe_qui_dépasse_les_50_caractères_et_doit_être_accepté_maintenant');

-- Sélection du mot de passe pour s'assurer qu'il est stocké correctement
SELECT
    "password"
FROM
    "user"
WHERE
    "pseudonym" = 'testuser';

ROLLBACK;
