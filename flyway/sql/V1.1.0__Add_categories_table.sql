--[ # TABLE public.categories # ]--

CREATE TABLE IF NOT EXISTS public.categories
(
  id         UUID                           DEFAULT uuid_generate_v4() NOT NULL
    CONSTRAINT categories_pk
      PRIMARY KEY,
  name       TEXT                                                      NOT NULL,
  parent_id  UUID,
  created_at TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP  NOT NULL,
  updated_at TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP  NOT NULL
);

CREATE TRIGGER set_categories_updated_at
  BEFORE UPDATE
  ON categories
  FOR EACH ROW
EXECUTE PROCEDURE trigger_set_updated_at();
