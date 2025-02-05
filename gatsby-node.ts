import { GatsbyNode } from "gatsby";
import * as path from "path";
import readingTime from "reading-time";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
}) => {
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

export const onCreateNode: GatsbyNode["onCreateNode"] = async ({
  node,
  actions,
  reporter,
  getNode,
  createNodeId,
  createContentDigest,
}) => {
  const { createNodeField, createNode, deleteNode } = actions;

  if (node.internal.type === "Mdx") {
    const frontmatter = node.frontmatter as Record<string, string>;
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
      }

      createNode(newCategoryNode);
    } else {
      const newCategoryNode = {
        id: createNodeId(`${category} >>> Category`),
        name: category,
        count: (categoryNode.count as number) + 1,
        parent: node.id,
        children: [],
        internal: {
          type: "Category",
          contentDigest: createContentDigest({ category }),
        },
      }

      deleteNode(categoryNode);
      createNode(newCategoryNode);
    }

    try {
      createNodeField({
        name: "timeToRead",
        node,
        value: readingTime(node.body as string),
      });
    } catch (e) {
      reporter.panicOnBuild(
        "Error creating node field (Node ID: " +
          node.id +
          "):\n" +
          (e as Error).message
      );
    }
  }
};

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
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

    type SiteMetadata {
      title: String!
      description: String!
      xUsername: String!
      siteUrl: String!
      image: String!
    }
  `;



    createTypes(typeDefs);
  };

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  const result = await graphql<{
    allMdx: {
      nodes: {
        id: string;
        frontmatter: {
          slug: string;
        };
        internal: {
          contentFilePath: string;
        };
      }[];
    };
  }>(`
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
