-- Revert sensi-bd:02-default-fk from pg

BEGIN;

ALTER TABLE "user"
  ALTER COLUMN "role_id" DROP DEFAULT;

COMMIT;
