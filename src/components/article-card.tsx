import React from "react";
import {GatsbyImageProps, GatsbyImage as Image} from "gatsby-plugin-image";
import { CalendarIcon, TagIcon } from "@primer/octicons-react";

type ArticleCardProps = {
  title: string;
  description: string;
  tag: string;
  date: string;
  url: string;
  image: GatsbyImageProps["image"];
};

const ArticleCard: React.FC<
  ArticleCardProps & React.HTMLAttributes<HTMLDivElement>
> = ({ title, description, tag, date, url, image, ...rest }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
      {...rest}
    >
      <Image
        image={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>

        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {description}
        </p>

        <div className="flex justify-between items-center text-sm text-gray-500 mt-auto">
          <div className="flex items-center">
            <TagIcon className="w-4 h-4 mr-1" />
            <span>{tag}</span>
          </div>

          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
