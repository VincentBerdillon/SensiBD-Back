BEGIN;

-- Insertion de données dans les messages
-- ** ATTENTION **
-- L'ajout de ce seeding doit être fait après le seeding.sql et après avoir rajouté à la main 3 utilisateurs en BDD
-- Pour que leur mot de passe puisse être hashé dans la méthode addUser du controller des users

INSERT INTO "message" ("sender_id", "receiver_id", "post_id", "content") VALUES
(9, 10, 1, 'Bonjour, je suis intéressé par votre annonce'),
(10, 9, 1, 'Merci pour votre message, je suis disponible pour l''échanger'),
(9, 10, 1, 'Êtes vous dispo ce samedi matin ?'),
(11, 10, 1, 'Bonjour, je suis intéressé par votre annonce moi aussi !'),
(10, 11, 1, 'Ah désolé on viens de me contacter pour cette annonce précise');

COMMIT;
