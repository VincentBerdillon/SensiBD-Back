-- Revert sensi-bd:07-add-column-in-message from pg

BEGIN;

ALTER TABLE "message"
  DROP COLUMN "is_read";

COMMIT;
