-- Deploy sensi-bd:01-init to pg

BEGIN;

CREATE DOMAIN "postal_code_fr" AS text
CHECK(
    value ~ '^\d{5}$' -- code postaux metropole de 01 a 09
    /*value ~ '^0[1-9]\d{3}$' -- code postaux metropole de 01 a 09
    OR value ~ '^20[1-2]\d{2}$|^20300$' -- code postaux de la Corse
    OR value ~ '^[13-8]\d{4}$' -- code postaux les plus génériques
    OR value ~ '^9[0-6]\d{3}$' -- code postaux metropole commencant par 9
    OR value ~ '^97[1-6]\d{2}$' -- code postaux DOM
    OR value ~ '^98[4678]\d{2}$' -- code postaux TOM
    OR value ~ '^9{5}$' -- code postal de la poste
    */
);

CREATE DOMAIN "email" AS text
CHECK(
    value ~ '(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'
);

CREATE TABLE "address" (
  "id" INT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  "full_address" VARCHAR(300) NOT NULL,
  "number" VARCHAR(10) NOT NULL,
  "street" VARCHAR (150) NOT NULL,
  "zipcode" postal_code_fr NOT NULL,
  "city" VARCHAR (100) NOT NULL,
  "country" VARCHAR (42) NOT NULL,
  "latitude" TEXT NOT NULL,
  "longitude" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "role" (
  "id" INT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user" (
  "id" INT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  "address_id" INT NOT NULL REFERENCES "address"("id") ON DELETE CASCADE,
  "role_id" INT NOT NULL REFERENCES "role"("id") ON DELETE CASCADE,
  "firstname" VARCHAR (50) NOT NULL,
  "lastname" VARCHAR (100) NOT NULL,
  "pseudonym" VARCHAR (50) NOT NULL UNIQUE,
  "email" email NOT NULL UNIQUE,
  "password" VARCHAR(50) NOT NULL,
  "avatar" TEXT,
  "score" INT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "category" (
  "id" INT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  "name" VARCHAR(25),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "audience" (
  "id" INT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  "name" VARCHAR (25),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "condition" (
  "id" INT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  "name" VARCHAR (25),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "post" (
  "id" INT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "category_id" INT NOT NULL REFERENCES "category"("id") ON DELETE CASCADE,
  "audience_id" INT NOT NULL REFERENCES "audience"("id") ON DELETE CASCADE,
  "condition_id" INT NOT NULL REFERENCES "condition"("id") ON DELETE CASCADE,
  "post_title" VARCHAR (200) NOT NULL,
  "description" TEXT NOT NULL,
  "book_title" VARCHAR (200) NOT NULL,
  "book_author" VARCHAR (200) NOT NULL,
  "image" TEXT,
  "slug" VARCHAR (128) NOT NULL,  
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "alert" (
  "id" INT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  "post_id" INT NOT NULL REFERENCES "post"("id") ON DELETE CASCADE,
  "label" VARCHAR (25) NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "message" (
  "id" INT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  "content" TEXT NOT NULL,
  "sender_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "receiver_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "post_id" INT NOT NULL REFERENCES "post"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user_likes_post" (
  "id" INT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "post_id" INT NOT NULL REFERENCES "post"("id") ON DELETE CASCADE
);

COMMIT;
