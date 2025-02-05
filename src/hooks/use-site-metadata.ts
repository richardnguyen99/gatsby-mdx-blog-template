import { graphql, useStaticQuery } from "gatsby";

type SiteMetadataType = {
  readonly title: string;
  readonly description: string;
  readonly xUsername: string;
  readonly siteUrl: string;
  readonly image: string;
}

export const useSiteMetadata = () => {
  const data = useStaticQuery<Queries.SiteMetadataQuery>(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          description
          xUsername
          siteUrl
          image
        }
      }
    }
  `)

  return data.site?.siteMetadata;
}
