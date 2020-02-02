import React from "react"
import Header from "./Header"
import Image from "./Image"

function Preface({ children }) {
  return (
    <div className="pane pane--text">
      <Header />
      {children}
    </div>
  )
}

function App(props) {
  return (
    <main className="site-content">
      <Preface>{props.preface}</Preface>
      {props.images.map((img, i) => (
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

export default App
