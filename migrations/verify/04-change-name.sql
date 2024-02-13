-- Verify sensi-bd:04-change-name on pg

BEGIN;

-- Ajout d'une adresse test avec le nom de colonne original
INSERT INTO "address" ("address", "number", "street", "zipcode", "city", "country", "latitude", "longitude")
VALUES ('456 Test Avenue', '456', 'Test Ave', '12345', 'Test City', 'Test Country', '10.1234', '20.5678');

-- Sélection des valeurs pour s'assurer que les données sont préservées
SELECT
    "address",
    "number",
    "street",
    "zipcode",
    "city",
    "country",
    "latitude",
    "longitude"
FROM
    "address"
WHERE
    "address" = '456 Test Avenue';

ROLLBACK;
