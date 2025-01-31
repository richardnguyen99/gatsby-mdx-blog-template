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
      },
    },
  });
};

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  reporter,
}) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    try {
      createNodeField({
        name: "timeToRead",
        node
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
