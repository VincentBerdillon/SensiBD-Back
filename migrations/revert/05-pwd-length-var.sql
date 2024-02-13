-- Revert sensi-bd:05-pwd-length-var from pg

BEGIN;

ALTER TABLE "user"
  ALTER COLUMN "password" TYPE VARCHAR(50);

COMMIT;
