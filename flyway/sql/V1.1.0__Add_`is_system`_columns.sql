/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

--[ ## BPL-20 ## ]--

ALTER TABLE public.categories
  ADD is_system BOOLEAN NOT NULL default false
;

ALTER TABLE public.financial_accounts
  ADD account_type TEXT NOT NULL default 'account-types.other',
  ADD is_system BOOLEAN NOT NULL default false
;
