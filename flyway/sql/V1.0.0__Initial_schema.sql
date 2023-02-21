/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

-- Tables are ordered alphabetically, except as dictated by foreign key constraints.

--[ # EXTENSIONS # ]--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--[ # TRIGGERS # ]--

-- See https://x-team.com/blog/automatic-timestamps-with-postgresql/
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
  RETURNS TRIGGER AS
$$
BEGIN
  new.updated_at = NOW();
  RETURN new;
END;
$$ LANGUAGE plpgsql;

--[ # NEXT AUTH TABLES # ]--

--[ ## TABLE public.users ## ]--

CREATE TABLE IF NOT EXISTS public.users
(
  id             UUID DEFAULT uuid_generate_v4() NOT NULL
    CONSTRAINT users_pk
      PRIMARY KEY,
  name           TEXT,
  email          TEXT,
  email_verified TIMESTAMP(3) WITHOUT TIME ZONE,
  image          TEXT
);

CREATE UNIQUE INDEX users_email
  ON users (email);

--[ ## TABLE public.user_accounts ## ]--

CREATE TABLE IF NOT EXISTS public.user_accounts
(
  id                       UUID DEFAULT uuid_generate_v4() NOT NULL
    CONSTRAINT user_accounts_pk
      PRIMARY KEY,
  user_id                  UUID                            NOT NULL
    CONSTRAINT user_accounts_user_id_fk
      REFERENCES users
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  type                     TEXT                            NOT NULL,
  provider                 TEXT                            NOT NULL,
  provider_account_id      TEXT                            NOT NULL,
  refresh_token            TEXT,
  refresh_token_expires_in INTEGER,
  access_token             TEXT,
  expires_at               INTEGER,
  token_type               TEXT,
  scope                    TEXT,
  id_token                 TEXT,
  session_state            TEXT
);

CREATE UNIQUE INDEX user_accounts_provider_account_id
  ON user_accounts (provider, provider_account_id);

--[ ## TABLE public.user_sessions ## ]--

CREATE TABLE IF NOT EXISTS public.user_sessions
(
  id            UUID DEFAULT uuid_generate_v4() NOT NULL
    CONSTRAINT user_sessions_pk
      PRIMARY KEY,
  session_token TEXT                            NOT NULL,
  user_id       UUID                            NOT NULL
    CONSTRAINT user_sessions_user_id_fk
      REFERENCES users
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  expires       TIMESTAMP(3) WITHOUT TIME ZONE  NOT NULL
);

CREATE UNIQUE INDEX user_sessions_session_token
  on user_sessions (session_token);

--[ ## TABLE public.user_verification_tokens ## ]--

CREATE TABLE IF NOT EXISTS public.user_verification_tokens
(
  id      UUID DEFAULT uuid_generate_v4() NOT NULL
    CONSTRAINT user_verification_tokens_pk
      PRIMARY KEY,
  token   TEXT                            NOT NULL,
  expires TIMESTAMP(3) WITHOUT TIME ZONE  NOT NULL
);

CREATE UNIQUE INDEX user_verification_tokens_id_token
  on user_verification_tokens (id, token);

CREATE UNIQUE INDEX user_verification_tokens_token
  on user_verification_tokens (token);

--[ # APPLICATION TABLES # ]--

--[ ## TABLE public.categories ## ]--

CREATE TABLE IF NOT EXISTS public.categories
(
  id         UUID                           DEFAULT uuid_generate_v4() NOT NULL
    CONSTRAINT categories_pk
      PRIMARY KEY,
  balance    INTEGER,
  name       TEXT                                                      NOT NULL,
  "order"    INTEGER,
  parent_id  UUID
    CONSTRAINT categories_parent_id_fk
      REFERENCES categories
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  created_at TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP  NOT NULL,
  updated_at TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP  NOT NULL
);

CREATE TRIGGER set_categories_updated_at
  BEFORE UPDATE
  ON categories
  FOR EACH ROW
EXECUTE PROCEDURE trigger_set_updated_at();

--[ ## TABLE public.financial_accounts ## ]--

CREATE TABLE IF NOT EXISTS public.financial_accounts
(
  id          UUID                           DEFAULT uuid_generate_v4() NOT NULL
    CONSTRAINT financial_accounts_pk
      PRIMARY KEY,
  description TEXT                                                      NOT NULL,
  created_at  TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP  NOT NULL,
  updated_at  TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP  NOT NULL
);

CREATE TRIGGER set_financial_accounts_updated_at
  BEFORE UPDATE
  ON financial_accounts
  FOR EACH ROW
EXECUTE PROCEDURE trigger_set_updated_at();

--[ ## TABLE public.transaction_records ## ]--

CREATE SEQUENCE IF NOT EXISTS public.transaction_records_order_sequence
  AS INTEGER
  START 1000;

CREATE TABLE IF NOT EXISTS public.transaction_records
(
  id          UUID                           DEFAULT uuid_generate_v4()                            NOT NULL
    CONSTRAINT transaction_records_pk
      PRIMARY KEY,
  "date"      DATE                                                                                 NOT NULL,
  "order"     INTEGER                        DEFAULT nextval('transaction_records_order_sequence') NOT NULL,
  description TEXT                                                                                 NOT NULL,
  type        TEXT                                                                                 NOT NULL,
  template_id UUID,
  created_at  TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP                             NOT NULL,
  updated_at  TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP                             NOT NULL
);

CREATE TRIGGER set_transaction_records_updated_at
  BEFORE UPDATE
  ON transaction_records
  FOR EACH ROW
EXECUTE PROCEDURE trigger_set_updated_at();

ALTER SEQUENCE transaction_records_order_sequence
  OWNED BY transaction_records."order";

--[ ## TABLE public.transaction_amounts ## ]--

CREATE TABLE IF NOT EXISTS public.transaction_amounts
(
  id                    UUID                           DEFAULT uuid_generate_v4() NOT NULL
    CONSTRAINT transaction_amounts_pk
      PRIMARY KEY,
  account_id            UUID                                                      NOT NULL
    CONSTRAINT transaction_amounts_financial_account_id_fk
      REFERENCES financial_accounts
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  transaction_record_id UUID                                                      NOT NULL
    CONSTRAINT transaction_amounts_transaction_record_id_fk
      REFERENCES transaction_records
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  notes                 TEXT,
  amount                INTEGER                                                   NOT NULL,
  is_credit             BOOLEAN                        DEFAULT false              NOT NULL,
  category_id           UUID                                                      NOT NULL
    CONSTRAINT transaction_amounts_category_id_fk
      REFERENCES categories
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  status                TEXT                                                      NOT NULL,
  created_at            TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP  NOT NULL,
  updated_at            TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP  NOT NULL
);

CREATE TRIGGER set_transaction_amounts_updated_at
  BEFORE UPDATE
  ON transaction_amounts
  FOR EACH ROW
EXECUTE PROCEDURE trigger_set_updated_at();
