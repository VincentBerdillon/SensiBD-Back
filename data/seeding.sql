BEGIN;

-- Insertion de données pour les rôles
INSERT INTO "role" ("name") VALUES ('membre'), ('admin'), ('bloqué');

-- Insertion de données pour les adresses
INSERT INTO "address" ("address", "number", "street", "zipcode", "city", "country", "latitude", "longitude") VALUES
('123 Rue de la Paix, 75000 Paris', '123', 'Rue de la Paix', '75000', 'Paris', 'France', 48.8566, 2.3522),
('456 Avenue de la Liberté, 33000 Bordeaux', '456', 'Avenue de la Liberté', '33000', 'Bordeaux', 'France', 44.8378, -0.5795),
('789 Boulevard du Midi, 13000 Marseille', '789', 'Boulevard du Midi', '13000', 'Marseille', 'France', 43.2965, 5.3698);

-- Insertion de données pour les utilisateurs
INSERT INTO "user" ("address_id", "role_id", "firstname", "lastname", "pseudonym", "email", "password", "avatar", "score") VALUES
(1, 2, 'Alice', 'Dupont', 'alice123', 'alice@example.com', 'Password123!', 'https://cdn.discordapp.com/attachments/1106504531510042706/1181904863320358912/image.png?ex=6582c1ae&is=65704cae&hm=869291b0dae51de9d7c163bfd0fc6ef839f9560f2a6f09b55489acc11dff7cec&', 10),
(1, 1, 'Bob', 'Martin', 'bob456', 'bob@example.com', 'Password456!', 'https://cdn.discordapp.com/attachments/1106504531510042706/1180974948588724234/image.png?ex=657f5fa1&is=656ceaa1&hm=86927a138d200f1bddafe4b3cd8d8a840e6ab2e749a3bcb0966cc44338487bc4&', 15),
(2, 1, 'Charlie', 'Durand', 'charlie789', 'charlie@example.com', 'Password789!', 'https://cdn.discordapp.com/attachments/1106504531510042706/1180975426915532880/image.png?ex=657f6013&is=656ceb13&hm=c2ab2fde7ce8e883a6f9c09af48f5bd181548d4f89876dde15b8a3f95d241bef&', 8),
(2, 1, 'Jean Pierre', 'Kopf', 'JPK', 'jp@example.com', 'Password452!', 'https://www.voici.fr/imgre/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fprismamedia_people.2F2017.2F06.2F30.2F030d8c30-8ce8-4e95-baa5-47cf7b8958f5.2Ejpeg/250x173/quality/80/jean-pierre-coffe.jpeg', 14),
(2, 1, 'Stan', 'Smith', 'chaussureman', 'stansmith@example.com', 'Password412!', 'https://www.asphaltgold.com/cdn/shop/products/97f36af23b3d7a2ca70b6513c42b4758fbf918e4_IF0202_Adidas_Stan_Smith_80s_Footwear_White_Footwear_White_Green_os_3_768x768.jpg?v=1695301981', 7),
(3, 1, 'Minfillia', 'Warde', 'Minfi', 'refugedessables.contact@example.com','Password741!', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR07XJLNZ4lSqgnIkkEY5Nik1H5E-6q26JkimqEbsHEkwgb0byrkP2JmOi3NtaMtQ6oPL0&usqp=CAU', 41),
(3, 1, 'Tataru', 'Taru', 'Tataru', 'tatarutaru@example.com', 'Password125!', 'https://static1.personality-database.com/profile_images/c972cd28153a41eead8b2b345d878855.png', 124),
(2, 3, 'Denise', 'Petit', 'denise101', 'denise@example.com', 'Password101!', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb6iHZDRxMVbrKc3JQOUxUHddM4YezvCEFUw&usqp=CAU', 20);

-- Insertion de données pour les catégories
INSERT INTO "category" ("name") VALUES ('BD'), ('Livre'), ('Magazine');

-- Insertion de données pour les audiences
INSERT INTO "audience" ("name") VALUES ('tout public'), ('jeunesse');

-- Insertion de données pour les conditions
INSERT INTO "condition" ("name") VALUES ('comme neuf'), ('légèrement abimé'), ('abimé');

-- Insertion de données pour les posts
INSERT INTO "post" ("user_id", "category_id", "audience_id", "condition_id", "post_title", "description", "book_title", "book_author", "image", "slug") VALUES
(2, 2, 1, 1, 'Don de livre sur l''écologie', 'Découvrez les secrets de l''écologie avec ce livre passionnant', 'La Terre en Héritage', 'Jean Écolo', 'https://www.editions-larousse.fr/sites/default/files/styles/couv_livre/public/images/livres/couv/9782035993465-001-T.jpeg?itok=d09IrJ_i', 'don-livre-ecologie'),
(2, 1, 1, 1, 'BD d''un dauphin défoncé', 'BD sur l''écologie Alphonse D.', 'Alphonse D. Le dauphin rien qu''un peu défoncé', 'Vincent Berdillon', 'https://www.observatoire-plancton.fr/2021/wp-content/uploads/2022/03/AlphonseD.jpg', 'bd-dauphin-defonce-1'),
(3, 2, 2, 2, 'Livre sur la permaculture', 'Don d''un livre sur la permaculture', 'La permaculture et vous', 'Michel Michel', 'https://laforetnourriciere.org/wp-content/uploads/2022/11/couv_livre3.png', 'don-livre-permaculture-1'),
(4, 3, 1, 3, 'Don de magazines sur l''écologie', 'Lot de magazine sur l''écologie', 'La montée de eaux et vous', 'Sarah Souleau', 'https://www.glenat.com/sites/default/files/images/livres/couv/9782344035542-001-T.jpeg', 'don-magazine-ecologie-1'),
(5, 1, 2, 1, 'Don de BD sur l''écologie', 'Je don cette BD sur l''écologie ! :D', 'Guerilla Green', 'Ophélie Damblé', 'https://actualitte.com/uploads/images/guerilla-green-cookie-kalkair-ophelie-damble-9782368467107-63c3dd5b1211a956783440.jpg', 'don-BD-ecolo-1'),
(6, 2, 1, 2, 'Don de livre sur l''écologie', 'Don du livre Traité sur l''écologie', 'Traité sur l''écologie', 'Stephane Chêne', 'https://www.editions-harmattan.fr/catalogue/couv/b/9782140281747b.jpg', 'don-livre-traite-ecologie-1'),
(7, 3, 2, 3, 'Don de magazine sur le recyclage', 'Je donne un magazine très instructif sur le recyclage ', 'Le bac à composte et vous', 'Géraldine Poucevert', 'https://www.hachette.fr/sites/default/files/images/livres/couv/9782035966865-001-T.jpeg', 'don-magazine-composte-1'),
(2, 1, 1, 1, 'BD d''un dauphin défoncé', 'BD sur l''écologie Alphonse D.', 'Alphonse D. Le dauphin rien qu''un peu défoncé', 'Vincent Berdillon', 'https://www.observatoire-plancton.fr/2021/wp-content/uploads/2022/03/AlphonseD.jpg', 'bd-dauphin-defonce-2'),
(3, 2, 2, 2, 'Livre sur la permaculture', 'Don d''un livre sur la permaculture', 'La permaculture et vous', 'Michel Michel', 'https://laforetnourriciere.org/wp-content/uploads/2022/11/couv_livre3.png', 'don-livre-permaculture-2'),
(4, 3, 1, 3, 'Don de magazines sur l''écologie', 'Lot de magazine sur l''écologie', 'La montée de eaux et vous', 'Sarah Souleau', 'https://www.glenat.com/sites/default/files/images/livres/couv/9782344035542-001-T.jpeg', 'don-magazine-ecologie-2'),
(5, 1, 2, 1, 'Don de BD sur l''écologie', 'Je don cette BD sur l''écologie ! :D', 'Guerilla Green', 'Ophélie Damblé', 'https://actualitte.com/uploads/images/guerilla-green-cookie-kalkair-ophelie-damble-9782368467107-63c3dd5b1211a956783440.jpg', 'don-BD-ecolo-2'),
(6, 2, 1, 2, 'Don de livre sur l''écologie', 'Don du livre Traité sur l''écologie', 'Traité sur l''écologie', 'Stephane Chêne', 'https://www.editions-harmattan.fr/catalogue/couv/b/9782140281747b.jpg', 'don-livre-traite-ecologie-2'),
(7, 3, 2, 3, 'Don de magazine sur le recyclage', 'Je donne un magazine très instructif sur le recyclage ', 'Le bac à composte et vous', 'Géraldine Poucevert', 'https://www.hachette.fr/sites/default/files/images/livres/couv/9782035966865-001-T.jpeg', 'don-magazine-composte-2'),
(2, 1, 1, 1, 'BD d''un dauphin défoncé', 'BD sur l''écologie Alphonse D.', 'Alphonse D. Le dauphin rien qu''un peu défoncé', 'Vincent Berdillon', 'https://www.observatoire-plancton.fr/2021/wp-content/uploads/2022/03/AlphonseD.jpg', 'bd-dauphin-defonce-3'),
(3, 2, 2, 2, 'Livre sur la permaculture', 'Don d''un livre sur la permaculture', 'La permaculture et vous', 'Michel Michel', 'https://laforetnourriciere.org/wp-content/uploads/2022/11/couv_livre3.png', 'don-livre-permaculture-3'),
(4, 3, 1, 3, 'Don de magazines sur l''écologie', 'Lot de magazine sur l''écologie', 'La montée de eaux et vous', 'Sarah Souleau', 'https://www.glenat.com/sites/default/files/images/livres/couv/9782344035542-001-T.jpeg', 'don-magazine-ecologie-3'),
(5, 1, 2, 1, 'Don de BD sur l''écologie', 'Je don cette BD sur l''écologie ! :D', 'Guerilla Green', 'Ophélie Damblé', 'https://actualitte.com/uploads/images/guerilla-green-cookie-kalkair-ophelie-damble-9782368467107-63c3dd5b1211a956783440.jpg', 'don-BD-ecolo-3'),
(6, 2, 1, 2, 'Don de livre sur l''écologie', 'Don du livre Traité sur l''écologie', 'Traité sur l''écologie', 'Stephane Chêne', 'https://www.editions-harmattan.fr/catalogue/couv/b/9782140281747b.jpg', 'don-livre-traite-ecologie-3'),
(7, 3, 2, 3, 'Don de magazine sur le recyclage', 'Je donne un magazine très instructif sur le recyclage ', 'Le bac à composte et vous', 'Géraldine Poucevert', 'https://www.hachette.fr/sites/default/files/images/livres/couv/9782035966865-001-T.jpeg', 'don-magazine-composte-3'),
(2, 1, 1, 1, 'BD d''un dauphin défoncé', 'BD sur l''écologie Alphonse D.', 'Alphonse D. Le dauphin rien qu''un peu défoncé', 'Vincent Berdillon', 'https://www.observatoire-plancton.fr/2021/wp-content/uploads/2022/03/AlphonseD.jpg', 'bd-dauphin-defonce-4'),
(3, 2, 2, 2, 'Livre sur la permaculture', 'Don d''un livre sur la permaculture', 'La permaculture et vous', 'Michel Michel', 'https://laforetnourriciere.org/wp-content/uploads/2022/11/couv_livre3.png', 'don-livre-permaculture-4'),
(4, 3, 1, 3, 'Don de magazines sur l''écologie', 'Lot de magazine sur l''écologie', 'La montée de eaux et vous', 'Sarah Souleau', 'https://www.glenat.com/sites/default/files/images/livres/couv/9782344035542-001-T.jpeg', 'don-magazine-ecologie-4'),
(5, 1, 2, 1, 'Don de BD sur l''écologie', 'Je don cette BD sur l''écologie ! :D', 'Guerilla Green', 'Ophélie Damblé', 'https://actualitte.com/uploads/images/guerilla-green-cookie-kalkair-ophelie-damble-9782368467107-63c3dd5b1211a956783440.jpg', 'don-BD-ecolo-4'),
(6, 2, 1, 2, 'Don de livre sur l''écologie', 'Don du livre Traité sur l''écologie', 'Traité sur l''écologie', 'Stephane Chêne', 'https://www.editions-harmattan.fr/catalogue/couv/b/9782140281747b.jpg', 'don-livre-traite-ecologie-4'),
(7, 3, 2, 3, 'Don de magazine sur le recyclage', 'Je donne un magazine très instructif sur le recyclage ', 'Le bac à composte et vous', 'Géraldine Poucevert', 'https://www.hachette.fr/sites/default/files/images/livres/couv/9782035966865-001-T.jpeg', 'don-magazine-composte-4'),
(2, 1, 1, 1, 'BD d''un dauphin défoncé', 'BD sur l''écologie Alphonse D.', 'Alphonse D. Le dauphin rien qu''un peu défoncé', 'Vincent Berdillon', 'https://www.observatoire-plancton.fr/2021/wp-content/uploads/2022/03/AlphonseD.jpg', 'bd-dauphin-defonce-5'),
(3, 2, 2, 2, 'Livre sur la permaculture', 'Don d''un livre sur la permaculture', 'La permaculture et vous', 'Michel Michel', 'https://laforetnourriciere.org/wp-content/uploads/2022/11/couv_livre3.png', 'don-livre-permaculture-5'),
(4, 3, 1, 3, 'Don de magazines sur l''écologie', 'Lot de magazine sur l''écologie', 'La montée de eaux et vous', 'Sarah Souleau', 'https://www.glenat.com/sites/default/files/images/livres/couv/9782344035542-001-T.jpeg', 'don-magazine-ecologie-5'),
(5, 1, 2, 1, 'Don de BD sur l''écologie', 'Je don cette BD sur l''écologie ! :D', 'Guerilla Green', 'Ophélie Damblé', 'https://actualitte.com/uploads/images/guerilla-green-cookie-kalkair-ophelie-damble-9782368467107-63c3dd5b1211a956783440.jpg', 'don-BD-ecolo-5'),
(6, 2, 1, 2, 'Don de livre sur l''écologie', 'Don du livre Traité sur l''écologie', 'Traité sur l''écologie', 'Stephane Chêne', 'https://www.editions-harmattan.fr/catalogue/couv/b/9782140281747b.jpg', 'don-livre-traite-ecologie-5'),
(7, 3, 2, 3, 'Don de magazine sur le recyclage', 'Je donne un magazine très instructif sur le recyclage ', 'Le bac à composte et vous', 'Géraldine Poucevert', 'https://www.hachette.fr/sites/default/files/images/livres/couv/9782035966865-001-T.jpeg', 'don-magazine-composte-5'),
(2, 1, 1, 1, 'BD d''un dauphin défoncé', 'BD sur l''écologie Alphonse D.', 'Alphonse D. Le dauphin rien qu''un peu défoncé', 'Vincent Berdillon', 'https://www.observatoire-plancton.fr/2021/wp-content/uploads/2022/03/AlphonseD.jpg', 'bd-dauphin-defonce-6'),
(3, 2, 2, 2, 'Livre sur la permaculture', 'Don d''un livre sur la permaculture', 'La permaculture et vous', 'Michel Michel', 'https://laforetnourriciere.org/wp-content/uploads/2022/11/couv_livre3.png', 'don-livre-permaculture-6'),
(4, 3, 1, 3, 'Don de magazines sur l''écologie', 'Lot de magazine sur l''écologie', 'La montée de eaux et vous', 'Sarah Souleau', 'https://www.glenat.com/sites/default/files/images/livres/couv/9782344035542-001-T.jpeg', 'don-magazine-ecologie-6'),
(5, 1, 2, 1, 'Don de BD sur l''écologie', 'Je don cette BD sur l''écologie ! :D', 'Guerilla Green', 'Ophélie Damblé', 'https://actualitte.com/uploads/images/guerilla-green-cookie-kalkair-ophelie-damble-9782368467107-63c3dd5b1211a956783440.jpg', 'don-BD-ecolo-6'),
(6, 2, 1, 2, 'Don de livre sur l''écologie', 'Don du livre Traité sur l''écologie', 'Traité sur l''écologie', 'Stephane Chêne', 'https://www.editions-harmattan.fr/catalogue/couv/b/9782140281747b.jpg', 'don-livre-traite-ecologie-6'),
(7, 3, 2, 3, 'Don de magazine sur le recyclage', 'Je donne un magazine très instructif sur le recyclage ', 'Le bac à composte et vous', 'Géraldine Poucevert', 'https://www.hachette.fr/sites/default/files/images/livres/couv/9782035966865-001-T.jpeg', 'don-magazine-composte-6'),
(3, 2, 1, 2, 'Livre éducatif sur l''environnement', 'Apprenez tout sur l''environnement avec ce guide complet', 'Sauver notre Planète', 'Marie Nature', 'https://m.media-amazon.com/images/I/71tS0+vOfxL._AC_UF894,1000_QL80_.jpg', 'livre-educatif-environnement');

COMMIT;
