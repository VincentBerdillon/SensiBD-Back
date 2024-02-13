-- Verify sensi-bd:07-add-column-in-message on pg

BEGIN;

SELECT "is_read" FROM "message" LIMIT 1;

ROLLBACK;
