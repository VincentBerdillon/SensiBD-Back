-- Revert sensi-bd:03-change-float from pg

BEGIN;

ALTER TABLE "address"
  ALTER COLUMN "latitude" TYPE text,
  ALTER COLUMN "longitude" TYPE text;

COMMIT;
