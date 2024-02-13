-- Deploy sensi-bd:04-change-name to pg

BEGIN;

ALTER TABLE "address"
  RENAME COLUMN "full_address" TO "address";

COMMIT;
