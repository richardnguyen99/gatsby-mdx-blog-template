import React from "react";
import { GatsbyImageProps, GatsbyImage as Image } from "gatsby-plugin-image";
import { CalendarIcon, TagIcon } from "@primer/octicons-react";
import { Link } from "gatsby";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

type ArticleCardProps = {
  frontmatter:
    | (Omit<Queries.MdxFrontmatter, "thumbnail"> & {
        thumbnail: {
          childImageSharp: {
            gatsbyImageData: GatsbyImageProps["image"];
          } | null;
        } | null;
      })
    | null;
  fields: {
    timeToRead: {
      text: string | null;
    } | null;
  } | null;
  id: Queries.Mdx["id"];
};

const ArticleCard: React.FC<
  ArticleCardProps & React.HTMLAttributes<HTMLDivElement>
> = ({ frontmatter, fields, id, ...rest }) => {
  return (
    <article
      className="bg-background hover:bg-accent border border-border rounded-lg shadow-md overflow-hidden flex flex-col h-full transition-colors pointer-events-auto cursor-default"
      {...rest}
    >
      <Image
        image={
          frontmatter?.thumbnail?.childImageSharp
            ?.gatsbyImageData as GatsbyImageProps["image"]
        }
        alt={frontmatter?.title ?? "Thumbnail"}
        className="w-full h-40 object-cover"
      />

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="">
          <Link
            to={`/blog/${frontmatter?.slug ?? id}`}
            className={cn(
              buttonVariants({ variant: "link", size: "lg" }),
              "px-0 text-xl font-semibold mb-2"
            )}
          >
            {frontmatter?.title ?? "No title"}
          </Link>
        </h3>

        <p className="text-slate-400 dark:text-slate-600 mb-4 line-clamp-3 flex-grow">
          {frontmatter?.description ?? "No description"}
        </p>

        <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-500 mt-auto">
          <div className="flex items-center">
            {frontmatter && (
              <>
                <TagIcon className="w-4 h-4 mr-1" />
                <span>{frontmatter.category}</span>
              </>
            )}
          </div>

          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <span>{frontmatter?.date ?? "No Date"}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
