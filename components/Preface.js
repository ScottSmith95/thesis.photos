import React from "react"

import Header from "./Header"

function Preface({ children }) {
  return (
    <div className="pane pane--text">
      <Header />
      {children}
    </div>
  )
}

export default Preface
