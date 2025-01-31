import React from "react";
import { graphql, PageProps } from "gatsby";

import { FilterDropdown } from "./filter-dropdown";
import { SortDropdown } from "./sort-dropdown";
import ArticleCard from "@/components/article-card";

type Props = PageProps<Queries.BlogPageQuery>;

export default function Blog(props: Props) {
  const { data } = props;

  return (
    <div className="min-h-screen max-w-3xl mx-auto pr-4 pl-8 mt-8">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <div className="text-center w-full">
          <h1 className="text-4xl font-bold">Blog</h1>

          <div className="flex items-center justify-between mt-8 pb-4 mb-4 border-b">
            <h3>All posts</h3>

            <div className="flex items-center gap-2">
              <FilterDropdown />
              <SortDropdown />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.allMdx.nodes.slice(0, 6).map((node) => {
            const {fields, id, frontmatter} = node;

            return (
              <ArticleCard key={id} 
                frontmatter={frontmatter}
                fields={fields}
                id={id}
              />
            )
          })}
        </div>
      </main>
    </div>
  );
}

export const query = graphql`
  query BlogPage {
    allMdx {
      nodes {
        id

        fields {
          timeToRead {
            text
          }
        }

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
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, quality: 100)
            }
          }
        }
      }
    }
  }
`;
