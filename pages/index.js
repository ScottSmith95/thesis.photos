import React, { useEffect } from "react"
import imageData from "../data/manifest"
import siteInfo from "../data/meta"

import Preface from "../components/Preface"
import Image from "../components/Image"

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
    <main className="site-content">
      <Preface>{siteInfo.fullDescription}</Preface>
      {images.map((img, i) => (
        <Image
          key={i}
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

export default HomePage
