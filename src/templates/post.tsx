import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { graphql } from "gatsby";

const shortCodes = {};

const PostLayout: React.FC<React.PropsWithChildren<Queries.PostLayoutQuery>> = ({ mdx, children }) => {
  return (
    <div className="min-h-screen max-w-3xl mx-auto pr-4 pl-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full text-center">
          <h1 className="mt-4 text-3xl">{mdx?.frontmatter?.title}</h1>
        </div>
        <div>
          <MDXProvider components={shortCodes}>{children}</MDXProvider>;
        </div>
      </main>
    </div>
  );
};

export default PostLayout;

export const query = graphql`
  query PostLayout($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`;
