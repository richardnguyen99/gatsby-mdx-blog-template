import React from "react";

import { useSiteMetadata } from "@/hooks/use-site-metadata";

type Props = Partial<
  NonNullable<Queries.SiteMetadataQuery["site"]>["siteMetadata"]
> & {
  jsonLd?: Record<string, unknown>;
};

const SEO: React.FC<Props> = ({
  title,
  description,
  image,
  siteUrl,
  xUsername,
  jsonLd,
}) => {
  const siteMetadata = useSiteMetadata();

  const {
    title: defaultTitle,
    description: defaultDescription,
    image: defaultImage,
    siteUrl: defaultSiteUrl,
    xUsername: defaultXUsername,
  } = siteMetadata || {};

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl || defaultSiteUrl}${image || defaultImage}`,
    siteUrl: `${siteUrl || defaultSiteUrl}`,
    xUsername: xUsername || defaultXUsername,
  };

  return (
    <>
      <title>{siteMetadata?.title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={seo.xUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:site_name" content={seo.title} />
      <meta property="og:url" content={seo.siteUrl} />
      <meta property="og:image" content={seo.image} />
      
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </>
  );
};

export default SEO;
