-- Verify sensi-bd:01-init on pg

BEGIN;

SELECT id FROM "address" WHERE false;

SELECT id FROM "role" WHERE false;

SELECT id FROM "user" WHERE false;

SELECT id FROM "category" WHERE false;

SELECT id FROM "audience" WHERE false;

SELECT id FROM "condition" WHERE false;

SELECT id FROM "post" WHERE false;

SELECT id FROM "alert" WHERE false;

SELECT id FROM "message" WHERE false;

SELECT id FROM "user_likes_post" WHERE false;

ROLLBACK;
