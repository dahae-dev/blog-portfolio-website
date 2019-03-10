import React from "react"
import { Link } from "gatsby"
import Header from "../components/header"

export default () => (
  <div style={{ width: "60%", color: "purple" }}>
    <Header headerText="Home" />
    <Link to="/blog">Blog</Link>
    <Link to="/projects">Projects</Link>
  </div>
)
