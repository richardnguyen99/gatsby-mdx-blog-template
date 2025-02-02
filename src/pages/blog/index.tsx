import React from "react";
import { GetServerData, graphql, PageProps } from "gatsby";

import { FilterDropdown } from "@/features/blog/filter-dropdown";
import { SortDropdown } from "@/features/blog/sort-dropdown";
import ArticleCard from "@/components/article-card";
import Pagination from "@/components/pagination";

const POSTS_PER_PAGE = 6;

type ServerDataType = {
  filter?: string;
  sort?: string;
  page?: number;
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
  const { filter, page = 1 } = serverData;

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
  });

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  // prettier-ignore
  const pageNumber = (page < 1) ? 1 
                                         : (page > totalPages) ? totalPages 
                                                               : page;

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-8 mt-8">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <div className="text-center w-full">
          <h1 className="text-4xl font-bold">Blog</h1>

          <div className="flex items-center justify-between mt-8 pb-4 mb-4 border-b">
            <h3>
              All posts{" "}
              <span className="text-muted">({posts.length} total)</span>
            </h3>

            <div className="flex items-center gap-2">
              <FilterDropdown
                currentFilter={filter || "all"}
                items={categoryItems}
              />
              <SortDropdown />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts
            .slice(
              (pageNumber - 1) * POSTS_PER_PAGE,
              pageNumber * POSTS_PER_PAGE
            )
            .map((node) => {
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

        <Pagination
          className="mt-8"
          currentPage={pageNumber}
          totalPages={totalPages}
          rootUrl="/blog"
        />
      </main>
    </div>
  );
}

export const getServerData: GetServerData<ServerDataType> = async (context) => {
  const { query } = context;

  const queryObj = query as Record<string, string>;
  const filter = queryObj["filter"] || undefined;
  const sort = queryObj["sort"] || undefined;
  const pageStr = queryObj["page"] || undefined;

  const page = parseInt(pageStr || "1", 10);

  return {
    status: 200, // The HTTP status code that should be returned
    props: {
      filter,
      sort,
      page,
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
