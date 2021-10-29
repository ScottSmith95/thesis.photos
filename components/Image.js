import React from "react"
import NextImage from 'next/image'
import useIntersect from "hooks/useIntersection"

const IS_CLIENT = typeof window !== "undefined"
const IS_DEV = process.env.NODE_ENV !== "production"

const thresholdArray = Array.from(Array(10).keys(), i => i / 10)

function PhotosImage(props) {
  const [imageLoaded, setImageLoaded] = React.useState(false)
  const [onScreen, setOnScreen] = React.useState(false)
  const [ref, entry] = useIntersect({
    rootMargin: "24px",
    threshold: thresholdArray,
  })
  const {
    width,
    height,
    aspectRatio,
    camera,
    description,
    fStop,
    focalLength,
    iso,
    name
  } = props

  React.useEffect(() => {
    if (entry?.intersectionRatio > 0.5) {
      setOnScreen(true)
    } else {
      setOnScreen(false)
    }
  }, [entry, onScreen])

  const image = (
    <NextImage
      src = {`/images/${name}`}
      alt = {`${description}`}
      width = {width}
      height = {height}
      layout="responsive"
      loading = "lazy"
      className={`image ${imageLoaded ? "loaded" : "not-loaded"}`}
      onLoad = {() => setImageLoaded(true)}
      sizes={`(orientation: landscape) calc(80vh * ${aspectRatio}), 100vw`}
    />
  )

  const speed =
    // If the shutter speed is a fraction, we want to style it appropriately.
    props.speed.includes("/") ? (
      <span className="frac">{props.speed}</span>
    ) : (
      props.speed
    )

  return (
    <>
    <figure
      ref={ref}
      className="pane pane--image"
    >
      <div className="image-container">{image}</div>
      <figcaption className="image__info">
        {camera}, {`\u0192${fStop}, `}
        {speed} sec, {focalLength}, <span className="caps">ISO</span> {iso}
      </figcaption>
    </figure>
    <style jsx>{`
      .image-container {
        opacity: ${onScreen ? 1 : 0.4};
        transition: 0.3s ease;
        transition-property: opacity;
      }
    `}</style>
    <style jsx>{`
      .pane {
        --aspect-ratio: ${aspectRatio};
      }
      .image-container {
        height: var(--imgSize);
        width: calc(var(--imgSize) * var(--aspect-ratio));
      }
      .pane :global(.image) {
        display: block;
        flex: 0 0 100%;
        object-fit: cover;
        object-position: center;
        transition: 0.3s ease opacity;
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.15);
        height: var(--imgSize);
      }
      @media (orientation: portrait) {
        .pane {
          height: auto;
          width: auto;
        }
        .image-container {
          width: 100%;
          height: auto;
        }
      }
    `}</style>
    </>
  )
}

export default PhotosImage