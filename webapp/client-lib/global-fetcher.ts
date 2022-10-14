export const globalFetcher = (
  resource: RequestInfo | URL,
  init?: RequestInit
) => fetch(resource, init).then((res) => res.json());
