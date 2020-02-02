import Head from "next/head"

import siteInfo from "../data/meta"

import '../components/styles/global.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
          <title>{siteInfo.title}</title>
          <meta name="description" content={siteInfo.description} />
  
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@ScottSmith95" />
          <meta property="twitter:account_id" content="36173544" />
          <meta property="og:title" content="Daniel Eden &mdash; Photography" />
          <meta property="og:type" content="website" />
          <meta property="og:description" content={siteInfo.description} />
          
          <link rel="icon" type="image/png" href="/favicons/favicon-32.png" sizes="32x32" />
          <link rel="apple-touch-icon" href="/favicons/favicon-180.png" />
        </Head>
      <Component {...pageProps} />
      </>
  )
}
