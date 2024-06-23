import { webpack } from "replugged";

export type FuzzySearch = (needle: string, haystack: string) => boolean;

export const fuzzysearch = await webpack.waitForModule<FuzzySearch>(
  webpack.filters.bySource(/charCodeAt\(\w+\+\+\)===\w+\)continue/),
);
