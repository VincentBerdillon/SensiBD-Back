-- Revert sensi-bd:04-change-name from pg

BEGIN;

ALTER TABLE "address"
  RENAME COLUMN "address" TO "full_address";

COMMIT;
