-- Deploy sensi-bd:03-change-float to pg

BEGIN;

ALTER TABLE "address"
  ALTER COLUMN "latitude" TYPE FLOAT8 USING latitude::FLOAT8,
  ALTER COLUMN "longitude" TYPE FLOAT8 USING longitude::FLOAT8;

COMMIT;
