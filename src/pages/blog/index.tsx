import React from "react";
import { GetServerData, graphql, PageProps } from "gatsby";

import { FilterDropdown } from "@/features/blog/filter-dropdown";
import { SortDropdown } from "@/features/blog/sort-dropdown";
import ArticleCard from "@/components/article-card";

type ServerDataType = {
  filter?: string;
  sort?: string;
};

type Props = PageProps<Queries.BlogPageQuery, object, unknown, ServerDataType>;

const filterPost = (category?: string) => {
  return (post: Queries.BlogPageQuery["allMdx"]["nodes"][number]) => {
    if (!category || category === "all") {
      return true;
    }

    return post.frontmatter?.category === category;
  };
};

export default function Blog(props: Props) {
  const { data, serverData } = props;
  const { filter } = serverData;

  const posts = data.allMdx.nodes.filter(filterPost(filter));
  const categories = data.allCategory.nodes;
  const categoryItems = categories.map(({ id, name, count }) => ({
    id: id,
    value: name,
    label: `${name} (${count})`,
  }));

  categoryItems.unshift({
    id: "all",
    value: "all",
    label: `All (${data.allMdx.nodes.length})`,
  })

  return (
    <div className="min-h-screen max-w-3xl mx-auto pr-4 pl-8 mt-8">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <div className="text-center w-full">
          <h1 className="text-4xl font-bold">Blog</h1>

          <div className="flex items-center justify-between mt-8 pb-4 mb-4 border-b">
            <h3>All posts <span className="text-muted">({posts.length} total)</span></h3>

            <div className="flex items-center gap-2">
              <FilterDropdown currentFilter={filter || "all"} items={categoryItems} />
              <SortDropdown />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.slice(0, 6).map((node) => {
            const { fields, id, frontmatter } = node;

            return (
              <ArticleCard
                key={id}
                frontmatter={frontmatter}
                fields={fields}
                id={id}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export const getServerData: GetServerData<ServerDataType> = async (context) => {
  const { query } = context;

  const queryObj = query as Record<string, string>;
  const filter = queryObj["f"] || undefined;
  const sort = queryObj["s"] || undefined;

  return {
    status: 200, // The HTTP status code that should be returned
    props: {
      filter,
      sort,
    }, // Will be passed to the page component as "serverData" prop
    headers: {}, // HTTP response headers for this page
  };
};

export const query = graphql`
  query BlogPage {
    allCategory {
      nodes {
        id
        name
        count
      }
    }

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
              gatsbyImageData(
                layout: CONSTRAINED
                quality: 100
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
  }
`;
