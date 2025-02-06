import { graphql, useStaticQuery } from "gatsby";

export const useSiteMetadata = () => {
  const data = useStaticQuery<Queries.SiteMetadataQuery>(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          titleTemplate
          description
          xUsername
          siteUrl
          image {
            src
            width
            height
            alt
          }
        }
      }
    }
  `)

  return data.site?.siteMetadata;
}
