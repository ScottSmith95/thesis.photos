import React, { useState, useEffect } from "react"
import siteInfo from "data/meta"

import Preface from "components/Preface"
import PhotosImage from "components/Image"

export default function HomePage({ imageData }) {
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
    <main className="site-content">
      <Preface>{siteInfo.fullDescription}</Preface>
      {imageData.slice().reverse().map((img, i) => (
        <PhotosImage
          key={i}
          width={img.width}
          height={img.height}
          aspectRatio={img.aspectRatio}
          camera={img.camera}
          fStop={img.fStop}
          focalLength={img.focalLength}
          iso={img.iso}
          name={img.fileName}
          speed={img.shutterSpeed}
          description={img.description}
        />
      ))}
    </main>
  )
}

export async function getStaticProps({ params }) {
  const imageData = await import("data/manifest")

  return {
    props: {
      imageData: imageData.default,
    },
  }
}
