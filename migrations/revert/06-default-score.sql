-- Revert sensi-bd:06-default-score from pg

BEGIN;


ALTER TABLE "user"
  ALTER COLUMN "score" DROP DEFAULT;

COMMIT;
