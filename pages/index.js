import Head from "next/head"
import React, { useEffect } from "react"
import App from "../components/App"
import imageData from "../data/manifest"
import siteInfo from "../data/meta"

const images = imageData.slice().reverse()

function HomePage() {
  useEffect(() => {
    let content = document.body
    window.addEventListener("mousewheel", MouseWheelHandler)

    function MouseWheelHandler(e) {
      if (content === undefined) {
        content = document.body
      } else {
        content.scrollLeft += e.deltaY
      }
    }

    return () => {
      window.removeEventListener("mousewheel", MouseWheelHandler)
    }
  })

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
      <App preface={siteInfo.fullDescription} images={images} />
    </>
  )
}

export default HomePage
