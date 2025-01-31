import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { graphql } from "gatsby";

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
        thumbnail {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, quality: 100)
          }
        }
      }
    }
  }
`;
