-- Deploy sensi-bd:07-add-column-in-message to pg

BEGIN;

ALTER TABLE "message"
  ADD COLUMN "is_read" BOOLEAN NOT NULL DEFAULT false;

COMMIT;
