import React from "react";
import { GetServerData, graphql, HeadFC, PageProps } from "gatsby";

import { FilterDropdown } from "@/features/blog/filter-dropdown";
import { SortDropdown } from "@/features/blog/sort-dropdown";
import ArticleCard from "@/components/article-card";
import Pagination from "@/components/pagination";
import SEO from "@/components/seo";

const POSTS_PER_PAGE = 6;

type ServerDataType = {
  filter?: string;
  sort?: string;
  page?: number;
};

type Props = PageProps<Queries.BlogPageQuery, object, unknown, ServerDataType>;

type Post = Queries.BlogPageQuery["allMdx"]["nodes"][number];

const filterPost = (category?: string) => {
  return (post: Post) => {
    if (!category || category === "all") {
      return true;
    }

    return post.frontmatter?.category === category;
  };
};

const sortStrategies: Record<string, (a: Post, b: Post) => number> = {
  date: (a, b) => {
    return (
      new Date(b.frontmatter?.date || 0).getTime() -
      new Date(a.frontmatter?.date || 0).getTime()
    );
  },

  timeToRead: (a, b) => {
    return (
      (a.fields?.timeToRead?.time || 0) - (b.fields?.timeToRead?.time || 0)
    );
  },
};

const sortPost = (sortBy: string) => {
  return (a: Post, b: Post) => sortStrategies[sortBy]?.(a, b) || 0;
};

export default function Blog(props: Props) {
  const { data, serverData } = props;
  const { filter, page, sort } = serverData;

  const posts = data.allMdx.nodes
    .filter(filterPost(filter))
    .sort(sortPost(sort || "date"));
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
  const pageNumber = (!page || page < 1) ? 1 
                                         : (page > totalPages) ? totalPages 
                                                               : page;

  const searchParams = new URLSearchParams();

  if (filter && filter !== "all") {
    searchParams.set("filter", filter);
  }

  if (sort) {
    searchParams.set("sort", sort);
  }

  if (page) {
    searchParams.set("page", pageNumber.toString());
  }

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
              <SortDropdown
                currentSort={sort || "date"}
                currentSearchParams={searchParams}
              />
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
          searchParams={searchParams}
          rootUrl="/blog"
        />
      </main>
    </div>
  );
}

export const Head: HeadFC = () => (
  <SEO
    key="Blog"
    title="Blog"
    description="Blog Page of Gatsby MDX Blog Starter"
    keywords={["gatsby", "mdx", "typescript", "blog", "template"]}
  />
);

export const getServerData: GetServerData<ServerDataType> = async (context) => {
  const { query } = context;

  const queryObj = query as Record<string, string>;
  const filter = queryObj["filter"] || undefined;
  const sort = queryObj["sort"] || undefined;
  const pageStr = queryObj["page"] || undefined;

  const page = parseInt(pageStr || "1", 10);
  const safePage = isNaN(page) ? 1 : page;

  return {
    status: 200, // The HTTP status code that should be returned
    props: {
      filter,
      sort,
      page: pageStr ? safePage : undefined,
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
            time
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
            publicId
            alt 
            cloudName
          }
        }
      }
    }
  }
`;
