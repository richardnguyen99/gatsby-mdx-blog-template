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
    siteUrl: `https://gatsby-mdx-blog-starter.netlify.app/`,
    description: `A Gatsby blog template using MDX`,
    xUsername: `@RichardNgu65749`,
    image: {
      src: `/og-image.png`,
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
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        resourceType: `image`,
      },
    },
    {
      resolve: `gatsby-transformer-cloudinary`,
      options: {
        // Add the `gatsbyImageData` resolver to `CloudinaryMedia`
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        transformTypes: [
          `CloudinaryMedia`,
          `MdxFrontmatterThumbnail`,
          // {
            // type: "MdxFrontmatterThumbnail",
            // cloudName: `didyolmw9`,
            // mapping: {
              // publicId: "publicId",
            // },
          // },
        ],
        defaultTransformations: [`c_fill`, `g_auto`, `q_auto`],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
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
