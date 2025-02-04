import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
  const data = useStaticQuery<NonNullable<Queries.SiteMetadataQuery>>(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          description
          xUsername
          siteUrl
        }
      }
    }
  `)

  return (data.site satisfies Queries.SiteMetadataQuery["site"])?.siteMetadata;
}
