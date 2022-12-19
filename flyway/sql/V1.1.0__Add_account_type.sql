/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

--[ ## TABLE public.financial_accounts ## ]--

ALTER TABLE public.financial_accounts
  ADD account_type TEXT NOT NULL default 'account-types.other'
;
