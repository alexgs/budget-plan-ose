/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

--[ ## BPL-33 ## ]--

ALTER TABLE public.financial_accounts
  ADD balance      INTEGER NOT NULL default 0
;
