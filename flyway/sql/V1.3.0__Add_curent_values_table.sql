--[ # TABLE public.current_values # ]--

CREATE TABLE IF NOT EXISTS public.current_values
(
  id          UUID                           DEFAULT uuid_generate_v4() NOT NULL
    CONSTRAINT current_values_pk
      PRIMARY KEY,
  category_id UUID                                                      NOT NULL
    CONSTRAINT current_values_category_id_fk
      REFERENCES categories
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  value       INTEGER                                                   NOT NULL,
  created_at  TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP  NOT NULL,
  updated_at  TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP  NOT NULL
);

CREATE TRIGGER set_current_values_updated_at
  BEFORE UPDATE
  ON current_values
  FOR EACH ROW
EXECUTE PROCEDURE trigger_set_updated_at();

--[ # TABLE public.categories # ]--

ALTER TABLE public.categories
  DROP COLUMN slug;
