import * as React from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import SEO from "@/components/seo";

const IndexPage: React.FC<PageProps<Queries.HomePageQueryQuery>> = ({
  data,
}) => {
  if (!data.file?.childImageSharp?.gatsbyImageData) {
    throw new Error("No image found");
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 gap-16 sm:p-20 sm:pb-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full text-center">
          <GatsbyImage
            image={data.file.childImageSharp.gatsbyImageData}
            alt="gatsbyjs icon"
            className="m-auto"
          />
          <h1 className="mt-4 text-3xl">Gatsby Blog with MDX</h1>
        </div>
      </main>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <SEO
  key="Homepage"
  keywords={["gatsby", "mdx", "typescript", "blog", "template"]}
/>;

export const pageQuery = graphql`
  query HomePageQuery {
    file(relativePath: { eq: "icon.png" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, width: 64, height: 64, placeholder: NONE)
      }
    }
  }
`;
