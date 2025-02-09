import type { GatsbyConfig } from "gatsby";
import dotenv from "dotenv";

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
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {},
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
