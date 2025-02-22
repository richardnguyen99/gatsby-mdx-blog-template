import type { GatsbyConfig } from "gatsby";
import dotenv from "dotenv";
import { type IMdxPluginOptions } from "gatsby-plugin-mdx/dist/plugin-options";

import algoliaQuery from "./scripts/algolia-query";
import rehypePlugins from "./src/lib/rehype-plugins";
import remarkPlugins from "./src/lib/remark-plugins"; 

dotenv.config({
  path: `.env`,
});

const config: GatsbyConfig = {
  flags: {
    DEV_SSR: true,
  },
  siteMetadata: {
    title: `Home`,
    titleTemplate: `Gatsby MDX Blog Starter`,
    siteUrl: `${process.env.GATSBY_PUBLIC_URL}/`,
    description: `A Gatsby blog template using MDX`,
    xUsername: `@RichardNgu65749`,
    image: {
      src: `${process.env.GATSBY_PUBLIC_URL}/og-image.png`,
      width: 1600,
      height: 836,
      alt: `OG Gatsby MDX Blog Starter Image`,
    },
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          // It's ok to commit this key to the repo:
          // https://stackoverflow.com/questions/68088629/should-google-analytics-tracking-id-be-kept-secret-or-can-i-embed-it-into-the-bu
          `G-RW65TSLLP4`, // Google Analytics / GA
          // "AW-CONVERSION_ID", // Google Ads / Adwords / AW
          // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        pluginConfig: {
          // Puts tracking script in the head tag instead of the body
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_WRITE_KEY,
        queries: algoliaQuery,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx",],
        mdxOptions: {
          remarkPlugins,
          rehypePlugins,
          remarkRehypeOptions: {},
        },
      } satisfies IMdxPluginOptions,
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: "./src/posts/",
      },
      __key: "posts",
    },
  ],
};

export default config;
