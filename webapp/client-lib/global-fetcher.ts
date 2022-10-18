/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

export const globalFetcher = (
  resource: RequestInfo | URL,
  init?: RequestInit
) => fetch(resource, init).then((res) => res.json());
