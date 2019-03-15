import React from "react"
import styled from "styled-components"
import Helmet from "react-helmet"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import PostTag from "../components/tag"

const PostTitle = styled.h1``

const PostDate = styled.span`
  color: #8e8e8e;
  font-size: 0.8rem;
`

const Navigation = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
`

export default ({ data, pageContext }) => {
  const { title: siteTitle } = data.site.siteMetadata
  const post = data.markdownRemark
  const { title, date, description, tags } = post.frontmatter
  const { previous, next } = pageContext

  return (
    <Layout>
      <Helmet>
        <title>{`${title} - ${siteTitle}`}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div>
        <PostTitle>{title}</PostTitle>
        <PostDate>{date}</PostDate>
        {` `}
        <PostTag tags={tags} />

        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        <Navigation>
          <div>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← previous post
                {/* ← previous post: {previous.frontmatter.title}  */}
              </Link>
            )}
          </div>
          <div>
            {next && (
              <Link to={next.fields.slug} rel="next">
                next post →{/* next post: {next.frontmatter.title} → */}
              </Link>
            )}
          </div>
        </Navigation>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        description
        tags
      }
    }
  }
`
