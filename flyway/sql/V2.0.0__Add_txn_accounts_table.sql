/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

--[ ## BPL-47 ## ]--

--[ ## TABLE public.transaction_accounts ## ]--

CREATE TABLE IF NOT EXISTS public.transaction_accounts
(
  id                    UUID                           DEFAULT uuid_generate_v4() NOT NULL
    CONSTRAINT transaction_accounts_pk
      PRIMARY KEY,
  account_id            UUID                                                      NOT NULL
    CONSTRAINT transaction_accounts_financial_account_id_fk
      REFERENCES financial_accounts
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  transaction_record_id UUID                                                      NOT NULL
    CONSTRAINT transaction_accounts_transaction_record_id_fk
      REFERENCES transaction_records
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  amount                INTEGER                                                   NOT NULL,
  is_credit             BOOLEAN                        DEFAULT false              NOT NULL,
  status                TEXT                                                      NOT NULL,
  created_at            TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP  NOT NULL,
  updated_at            TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP  NOT NULL
);

CREATE TRIGGER set_transaction_accounts_updated_at
  BEFORE UPDATE
  ON transaction_accounts
  FOR EACH ROW
EXECUTE PROCEDURE trigger_set_updated_at();

--[ ## TABLE public.transaction_amounts -> public.transaction_categories ## ]--

ALTER TABLE public.transaction_amounts
  RENAME TO transaction_categories;

ALTER TABLE public.transaction_categories
  DROP COLUMN account_id;

ALTER TABLE public.transaction_categories
  DROP COLUMN status;

ALTER TABLE public.transaction_categories
  RENAME CONSTRAINT transaction_amounts_pk to transaction_categories_pk;

ALTER TABLE public.transaction_categories
  RENAME CONSTRAINT transaction_amounts_transaction_record_id_fk to transaction_categories_transaction_record_id_fk;

ALTER TABLE public.transaction_categories
  RENAME CONSTRAINT transaction_amounts_category_id_fk to transaction_categories_category_id_fk;

ALTER TRIGGER set_transaction_amounts_updated_at
  ON transaction_categories
  RENAME TO set_transaction_categories_updated_at;
