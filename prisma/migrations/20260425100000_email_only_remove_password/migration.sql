-- Anciennes sessions applicatives (non utilisées avec auth email).
DROP TABLE IF EXISTS "sessions" CASCADE;

DROP TABLE IF EXISTS "next_auth_sessions" CASCADE;

CREATE TABLE "next_auth_sessions" (
    "id" UUID NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "next_auth_sessions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "next_auth_sessions_session_token_key" ON "next_auth_sessions"("session_token");

CREATE INDEX "next_auth_sessions_user_id_idx" ON "next_auth_sessions"("user_id");

ALTER TABLE "next_auth_sessions" ADD CONSTRAINT "next_auth_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "users" DROP COLUMN IF EXISTS "password_hash";
ALTER TABLE "users" DROP COLUMN IF EXISTS "password_reset_token_hash";
ALTER TABLE "users" DROP COLUMN IF EXISTS "password_reset_expires_at";

DROP INDEX IF EXISTS "users_password_reset_token_hash_idx";
