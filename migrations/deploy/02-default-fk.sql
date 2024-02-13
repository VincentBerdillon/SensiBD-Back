-- Deploy sensi-bd:02-default-fk to pg

BEGIN;

ALTER TABLE "user"
  ALTER COLUMN "role_id" SET DEFAULT 1;

COMMIT;
