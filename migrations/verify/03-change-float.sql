-- Verify sensi-bd:03-change-float on pg

BEGIN;

-- Ajout d'une adresse test avec des valeurs textuelles pour latitude et longitude
INSERT INTO "address" ("address", "number", "street", "zipcode", "city", "country", "latitude", "longitude")
VALUES ('123 Test Street', '123', 'Test St', '75001', 'Test City', 'Test Country', '48.8566', '2.3522');

-- Vérification des types de colonnes
SELECT
    pg_typeof(latitude) AS latitude_type,
    pg_typeof(longitude) AS longitude_type
FROM
    "address"
WHERE
    address = '123 Test Street';

-- Sélection des valeurs pour s'assurer qu'elles sont correctement converties
SELECT
    "latitude",
    "longitude"
FROM
    "address"
WHERE
    address = '123 Test Street';

ROLLBACK;
