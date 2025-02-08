import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { graphql, HeadFC } from "gatsby";

import SEO from "@/components/seo";

const shortCodes = {};

type PostLayoutData = {
  data: Queries.PostLayoutQuery;
};

const PostLayout: React.FC<React.PropsWithChildren<PostLayoutData>> = ({
  data,
  children,
}) => {
  return (
    <div className="min-h-screen max-w-3xl mx-auto pr-4 pl-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full text-center">
          <h1 className="mt-4 text-3xl">{data.mdx?.frontmatter?.title}</h1>

          <div className="flex items-center justify-between w-full mt-4 mb-4 pb-4 text-sm text-gray-500 border-b dark:border-slate-800 border-b-gray-200">
            <div>{data.mdx?.fields?.timeToRead?.text}</div>
            <div>{data.mdx?.frontmatter?.date}</div>
          </div>
        </div>

        <div>
          <MDXProvider components={shortCodes}>{children}</MDXProvider>
        </div>

        <hr className="w-full border-t dark:border-slate-800 my-8" />

        <div className="mb-8">
          <h3 className="text-xl">
            Written by {data.mdx?.frontmatter?.author}
          </h3>
        </div>
      </main>
    </div>
  );
};

export default PostLayout;

export const query = graphql`
  query PostLayout($id: String!) {
    mdx(id: { eq: $id }) {
      fields {
        timeToRead {
          minutes
          time
          text
        }
      }

      frontmatter {
        slug
        title
        date
        author
        description
        tags
        category
        published
        publishedAt
      }
    }
  }
`;

export const Head: HeadFC<Queries.PostLayoutQuery> = ({ data }) => {
  const { mdx }  = data;

  return <SEO
    key={`${mdx?.frontmatter?.slug}`}
    title={`${mdx?.frontmatter?.title}`}
    description={`${mdx?.frontmatter?.description}`}
    keywords={mdx?.frontmatter?.tags as string[]}
  >
    <script type="application/ld+json">
      {
        `
        {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "${mdx?.frontmatter?.title}",
          "image": [
            "${mdx?.frontmatter?.thumbnail?.gatsbyImageData?.images.fallback?.src}"
          ],
          "datePublished": "${new Date(mdx?.frontmatter?.publishedAt || 0).toISOString()}",
          "dateModified":  "${new Date(mdx?.frontmatter?.date || 0).toISOString()}",
          "author": ${JSON.stringify([{
            "@type": "Person",
            "name": mdx?.frontmatter?.author,
            "url": "https://x.com/RichardNgu65749"
          }])}
        }
        `
      }
    </script>
  </SEO>
};
