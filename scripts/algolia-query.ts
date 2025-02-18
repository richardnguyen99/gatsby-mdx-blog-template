import { Cloudinary } from "@cloudinary/url-gen";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
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

type Edges = {
  nodes: {
    id: string;
    body: string;
    frontmatter: {
      slug: string;
      title: string;
      date: string;
      author: string;
      description: string;
      tags: string[];
      category: string;
      published: boolean;
      publishedAt: string;
      thumbnail: {
        publicId: string;
      };
    };
  }[];
};

function extractHeadings(tableOfContents: any): any[] {
  const headings: any[] = [];
  const items = tableOfContents.items;

  items.forEach((item: any) => {
    const depth = 1;
    const text = item.title;
    const subItems = item.items;

    if (subItems) {
      subItems.forEach((subItem: any) => {
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

function pageToAlgoliaRecord(props: any) {
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
    transformer: ({ data }: { data: any }) =>
      data.pages.nodes.map(pageToAlgoliaRecord),
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME as string,
  },
];

export default queries;
