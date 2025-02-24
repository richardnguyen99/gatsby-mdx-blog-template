import * as path from "path";
import readingTime from "reading-time";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @typedef {import("gatsby").GatsbyNode["onCreateWebpackConfig"]} */
export const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src", "components"),
        "@/lib": path.resolve(__dirname, "src", "lib"),
        "@/features": path.resolve(__dirname, "src", "features"),
        "@/hooks": path.resolve(__dirname, "src", "hooks"),
      },
    },
  });
};

/** @typedef {import("gatsby").GatsbyNode["onCreateNode"]} */
export const onCreateNode = async ({
  node,
  actions,
  reporter,
  getNode,
  createNodeId,
  createContentDigest,
}) => {
  const { createNodeField, createNode, deleteNode } = actions;

  if (node.internal.type === "Mdx") {
    const frontmatter = node.frontmatter;
    const { category } = frontmatter;

    const nodeId = createNodeId(`${category} >>> Category`);
    const categoryNode = getNode(nodeId);

    if (!categoryNode) {
      const newCategoryNode = {
        id: createNodeId(`${category} >>> Category`),
        name: category,
        count: 1,
        parent: node.id,
        children: [],
        internal: {
          type: "Category",
          contentDigest: createContentDigest({ category }),
        },
      };

      createNode(newCategoryNode);
    } else {
      const newCategoryNode = {
        id: createNodeId(`${category} >>> Category`),
        name: category,
        count: categoryNode.count + 1,
        parent: node.id,
        children: [],
        internal: {
          type: "Category",
          contentDigest: createContentDigest({ category }),
        },
      };

      deleteNode(categoryNode);
      createNode(newCategoryNode);
    }

    try {
      createNodeField({
        name: "timeToRead",
        node,
        value: readingTime(node.body),
      });
    } catch (e) {
      reporter.panicOnBuild(
        "Error creating node field (Node ID: " + node.id + "):\n" + e.message
      );
    }
  }
};

/** @typedef {import("gatsby").GatsbyNode["createSchemaCustomization"]} */
export const createSchemaCustomization = (
  {
    getNode,
    getNodesByType,
    pathPrefix,
    reporter,
    cache,
    actions,
    schema,
    store,
  },
  pluginOptions
) => {
  const { createTypes } = actions;
  const typeDefs = `#graphql
    type Category implements Node {
      id: ID!
      name: String!
      count: Int!
    }

    type Site { 
      siteMetadata: SiteMetadata!
    }

    type OGImage {
      src: String!
      width: Int!
      height: Int!
      alt: String!
    }

    type SiteMetadata {
      title: String!
      titleTemplate: String!
      description: String!
      xUsername: String!
      siteUrl: String!
      image: OGImage!
    }
  `;

  createTypes(typeDefs);
};

/** @typedef {GatsbyNode["createPages"]} */
export const createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    #graphql
    query MdxNode {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX result", result.errors);
    return;
  }

  if (typeof result.data === "undefined") {
    reporter.panicOnBuild("No data returned from MDX query");
    return;
  }

  // Create blog post pages.
  const posts = result.data.allMdx.nodes;
  const postTemplate = path.resolve(__dirname, "src", "templates", "post.tsx");

  posts.forEach((post) => {
    createPage({
      path: `/blog/${post.frontmatter.slug}`,
      component: `${postTemplate}?__contentFilePath=${post.internal.contentFilePath}`,
      context: {
        id: post.id,
      },
    });
  });
};
