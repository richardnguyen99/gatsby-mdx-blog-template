import * as React from "react";
import { type HeadFC } from "gatsby";

import SEO from "@/components/seo";
import ImageCard from "@/components/image-card";

const IndexPage: React.FC = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 gap-16 sm:p-20 sm:pb-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full text-center">
          <React.Suspense
            fallback={
              <div className="rounded-full w-[64px] h-[64px] m-auto"></div>
            }
          >
            <ImageCard
              src="gatsby-icon"
              alt="icon"
              className="[&>img]:w-[64px] [&>img]:h-[64px] [&>img]:m-auto"
            />
          </React.Suspense>
          <h1 className="mt-4 text-3xl">Gatsby Blog with MDX</h1>
        </div>
      </main>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <SEO
    key="Homepage"
    title="Home"
    description="A blog starter template for Gatsby with MDX and TypeScript."
    keywords={["gatsby", "mdx", "typescript", "blog", "template"]}
  />
);
