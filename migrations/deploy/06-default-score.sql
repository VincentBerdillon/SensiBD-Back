-- Deploy sensi-bd:06-default-score to pg

BEGIN;

ALTER TABLE "user"
  ALTER COLUMN "score" SET DEFAULT 10;

COMMIT;
