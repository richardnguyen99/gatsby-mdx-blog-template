import { createMemoryCache } from "@algolia/client-common";
import { liteClient as algoliasearch } from "algoliasearch/lite";

export const responsesCache = createMemoryCache();
export const client = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID as string,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY as string,
  { responsesCache }
);
