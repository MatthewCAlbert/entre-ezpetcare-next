import Head from 'next/head'
import common from '../../config/common.json'

interface MetaProps{
  name?: string,
  property?: string,
  content: string
}

export interface SEOAttribute<P = any> {
  title?: string,
  indexPage?: boolean,
  description?: string,
  keywords?: string[],
  useSuffix?: boolean,
  useJargon?: boolean,
  props?: P,
  meta?: MetaProps[]
}

const SEO: React.FC<SEOAttribute> = ({ 
  title = "", 
  indexPage = true,
  keywords = [], 
  description = "", 
  useSuffix = true,
  useJargon = false
}) => {
  const metaDescription = description || common.siteMetadata.description;
  const jargon = common.siteMetadata.jargon;
  const suffix = useJargon ? jargon : common.siteMetadata.suffix;
  const defaultTitle = title || common.siteMetadata.title;
  const renderedTitle = defaultTitle && useSuffix ? `${defaultTitle} | ${suffix}` : defaultTitle;

  const imageMeta = common.siteMetadata.image;
  
  const renderedKeywords = keywords.join(", ") || common.siteMetadata.keywords;

  return (
    <>
      <Head>
        <title>{renderedTitle}</title>
        <meta name="description" content={metaDescription} />
        {
          !indexPage && <>
          <meta name="robots" content="noindex" />
          <meta name="googlebot" content="noindex" />
          </>
        }

        <meta property="og:site_name" content={common.siteMetadata.title}/>
        <meta property="og:title" content={renderedTitle}/>
        <meta property="og:description" content={metaDescription}/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content={imageMeta}/>

        <meta name="twitter:image" content={imageMeta}/>
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:title" content={renderedTitle}/>
        <meta name="twitter:description" content={metaDescription}/>

        <meta name="keywords" content={renderedKeywords}/>

        <meta name="theme-color" content="#ffffff"/>
      </Head>
    </>
  )
}

export default SEO;