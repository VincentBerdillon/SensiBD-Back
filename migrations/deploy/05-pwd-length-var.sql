-- Deploy sensi-bd:05-pwd-length-var to pg

BEGIN;

ALTER TABLE "user"
  ALTER COLUMN "password" TYPE VARCHAR(200);

COMMIT;
