import { Cloudinary } from "@cloudinary/url-gen";
import dotenv from "dotenv";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { getSingletonHighlighter } from "shiki";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

// import rehypePlugins from "./src/lib/rehype-plugins";
// import remarkPlugins from "./src/lib/remark-plugins";

dotenv.config({
  path: `.env`,
});

const pageQuery = `#graphql
query AlgoliaQuery {
  pages: allMdx {
    nodes {
      id
      body

      internal {
        contentDigest
      }
      
      fields {
        timeToRead {
          minutes
          time
          text
          time
        }
      }

      tableOfContents(maxDepth: 3)

      frontmatter {
        slug
        title
        date(formatString: "MMM Do, YYYY")
        author
        description
        tags
        category
        published
        publishedAt
        thumbnail {
          cloudName
          alt
          publicId
        }
      }
    }
  }
}`;

function extractHeadings(tableOfContents) {
  const headings = [];
  const items = tableOfContents.items;

  items.forEach((item) => {
    const depth = 1;
    const text = item.title;
    const subItems = item.items;

    if (subItems) {
      subItems.forEach((subItem) => {
        headings.push({
          depth: depth + 1,
          text: subItem.title,
        });
      });
    }

    headings.push({
      depth,
      text,
    });
  });

  console.log("headings", headings);

  return headings;
}

function pageToAlgoliaRecord(props) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.GATSBY_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.GATSBY_CLOUDINARY_API_KEY,
    },
  }).image(props.frontmatter.thumbnail.publicId);

  return {
    objectID: props.frontmatter.slug,
    title: props.frontmatter.title,
    description: props.frontmatter.description,
    tags: props.frontmatter.tags,
    publishedAt: props.frontmatter.publishedAt,
    imageUrl: cld.toURL(),
    headings: extractHeadings(props.tableOfContents),
    internal: props.internal,
  };
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.nodes.map(pageToAlgoliaRecord),
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
  },
];

const rehypePlugins = [
  // Render code blocks with syntax highlighting
  [
    rehypePrettyCode,
    {
      theme: {
        dark: "github-dark-default",
        light: "github-light-default",
      },
      keepBackground: true,
      getHighlighter: async (options) =>
        await getSingletonHighlighter({
          ...options,
          langs: [...options.langs, "make", "makefile", "cmake"],
        }),
    },
  ],

  // Generate slug id for headings
  [
    rehypeSlug,
    {
      prefix: "rehype-",
    },
  ],
  // Add anchor links to headings. Depends on `rehypeSlug`
  [
    rehypeAutolinkHeadings,
    {
      behavior: "append",
      properties: {
        className: "anchor",
      },
      content: {
        type: "element",
        tagName: "span",
        properties: {
          className: "icon icon-link",
        },
        children: [
          {
            type: "text",
            value: "#",
          },
        ],
      },
    },
  ],

  // Render math and scientific annotations in HTML
  [
    rehypeKatex,
    {
      strict: true,
    },
  ],
];

const remarkPlugins = [
  // Add Latex and Katex syntax support for math and scientific annotations
  remarkMath,

  // Add rich markdown syntax support for tables, footnotes, etc.
  remarkGfm,
];

const config = {
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
        queries,
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
        extensions: [".mdx"],
        mdxOptions: {
          remarkPlugins,
          rehypePlugins,
          remarkRehypeOptions: {},
        },
      },
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
