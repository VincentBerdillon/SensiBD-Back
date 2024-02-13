-- Revert sensi-bd:01-init from pg

BEGIN;

DROP TABLE "address","role","user","category","audience","condition","post","alert","message","user_likes_post";

DROP DOMAIN "postal_code_fr", "email";


COMMIT;
