import React from "react"
import useIntersect from "hooks/useIntersection"

const IS_CLIENT = typeof window !== "undefined"
const IS_DEV = process.env.NODE_ENV !== "production"

const thresholdArray = Array.from(Array(10).keys(), i => i / 10)

const Placeholder = ({ aspectRatio }) => {
  const style = { "--aspect-ratio": aspectRatio }
  return <div role="presentation" className="placeholder" style={style} />
}

function Image(props) {
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
    if (entry?.intersectionRatio > 0) {
      setOnScreen(true)
    }
  }, [entry])

  const imgClass = [
    "image__img",
    IS_CLIENT
      ? imageLoaded && onScreen
        ? "is-loaded"
        : "is-not-loaded"
      : "ssr",
  ].join(" ")

  const ssrStyle = !IS_CLIENT
    ? ({ "--aspect-ratio": aspectRatio })
    : null

  const image = (
    <img
      src = {`/images/${name}`}
      alt = {`${description}`}
      width = {width}
      height = {height}
      loading = "lazy"
      onLoad = {() => setImageLoaded(true)}
      style = {ssrStyle}
      className = {imgClass}
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
    <figure
      ref={ref}
      className="pane pane--image"
      style={
        IS_CLIENT
          ? {
              opacity: Math.max(entry?.intersectionRatio || 0, 0.1),
              transform: `scale(${0.9 + entry?.intersectionRatio / 10})`,
            }
          : null
      }
    >
      {(onScreen || !IS_CLIENT) && image}
      {!imageLoaded && IS_CLIENT ? (
        <Placeholder aspectRatio={aspectRatio} />
      ) : null}
      <figcaption className="image__info">
        {camera}, {`\u0192${fStop}, `}
        {speed} sec, {focalLength}, <span className="caps">ISO</span> {iso}
      </figcaption>
    </figure>
  )
}

export default Image
