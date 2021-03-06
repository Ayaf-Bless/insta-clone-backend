import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import path from "path";
  
const loadedTypes = loadFilesSync(path.join(__dirname, "./**/*.typeDefs.js"), {
  recursive: true,
});
const loadedResolvers = loadFilesSync(
  path.join(__dirname, "./**/*.resolvers.js"),
  {
    recursive: true,
  }
);
export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);

