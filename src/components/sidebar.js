import React from "react"
import styled from "styled-components"

import Bio from "./bio"
import { NavMenu } from "./navmenu"

const SideBar = styled.div`
  background-color: #3c2e3d; // 735b69
  height: 100%;
  width: 35%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media screen and (max-width: 980px) {
    left: auto;
    padding: 6em 4em;
    position: relative;
    text-align: center;
    top: auto;
    width: 100%;
    display: block;
  }

  @media screen and (max-width: 600px) {
    padding: 4em 4em;
  }
`

const MenuContainer = styled.div`
  padding: 2rem;
  position: relative;
  display: flex;
  justify-content: center;
`

const Footer = styled.div`
  width: 100%;
  font-size: 0.8rem;
  text-align: center;
  margin: 1rem auto;
  position: relative;
  top: 5rem;
  color: #fff;

  @media screen and (max-width: 600px) {
    top: 2rem;
  }
`

export default () => (
  <SideBar>
    <Bio />
    <MenuContainer>
      <NavMenu to="/" padding="0.5rem">
        Home
      </NavMenu>
      <NavMenu to="/blog" padding="0.5rem">
        Blog
      </NavMenu>
      <NavMenu to="/projects" padding="0.5rem">
        Projects
      </NavMenu>
    </MenuContainer>
    <Footer>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </Footer>
  </SideBar>
)
