import React from "react";

import { useSiteMetadata } from "@/hooks/use-site-metadata";

type Props = Partial<
  NonNullable<Queries.SiteMetadataQuery["site"]>["siteMetadata"]
> & {
  children?: React.ReactNode | React.ReactNode[];
  keywords?: string[]
};

const SEO: React.FC<Props> = ({
  title,
  description,
  image,
  siteUrl,
  xUsername,
  children,
  keywords = ["blog", "gatsby", "mdx", "typescript"],
}) => {
  const siteMetadata = useSiteMetadata();

  const {
    titleTemplate,
    title: defaultTitle,
    description: defaultDescription,
    image: defaultImage,
    siteUrl: defaultSiteUrl,
    xUsername: defaultXUsername,
  } = siteMetadata || {};

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    siteUrl: `${siteUrl || defaultSiteUrl}`,
    xUsername: xUsername || defaultXUsername,
    image: {
      src: image?.src || defaultImage?.src,
      width: image?.width || defaultImage?.width,
      height: image?.height || defaultImage?.height,
      alt: image?.alt || defaultImage?.alt,
    }
  };

  return (
    <>
      <title key={`${seo.title}`}>{`${seo.title} | ${titleTemplate}`}</title>
      <meta name="description" content={description} />
      <meta name="image" content={`${seo.siteUrl}${seo.image.src}`} />
      <meta name="keywords" content={keywords.join(",")} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={seo.xUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={`${seo.image.src}`} />
      <meta property="twitter:image:width" content={`${seo.image.width}`} />
      <meta property="twitter:image:height" content={`${seo.image.height}`} />
      <meta property="twitter:image:alt" content={`${seo.image.alt}`} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:site_name" content={seo.title} />
      <meta property="og:url" content={seo.siteUrl} />
      <meta property="og:image" content={`${seo.image.src}`} />
      <meta property="og:image:width" content={`${seo.image.width}`} />
      <meta property="og:image:height" content={`${seo.image.height}`} />
      <meta property="og:image:alt" content={`${seo.image.alt}`} />

      {children} 
    </>
  );
};

export default SEO;
