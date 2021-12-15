import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import path from "path";

const loadedTypes = loadFilesSync(path.join(__dirname, "./**/*.typeDefs.js"), {
  recursive: true,
});
const loadedResolvers = loadFilesSync(
  path.join(__dirname, "./**/*.{queries,mutations}.js"),
  {
    recursive: true,
  }
);
const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

export default makeExecutableSchema({ typeDefs, resolvers });
