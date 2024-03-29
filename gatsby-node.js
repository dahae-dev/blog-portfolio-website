const path = require(`path`)
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages/blog` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve("src/templates/blog-post.js")
  const projectTemplate = path.resolve("src/templates/project-post.js")
  const tagTemplate = path.resolve("src/templates/tags.js")

  return graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
              category
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const results = result.data.allMarkdownRemark.edges

    const posts = results.filter(
      result => result.node.frontmatter.category === "blog"
    )

    const projects = results.filter(
      result => result.node.frontmatter.category === "projects"
    )

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: `${post.node.fields.slug}`,
        component: blogPostTemplate,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    projects.forEach(project => {
      createPage({
        path: `${project.node.fields.slug}`,
        component: projectTemplate,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: project.node.fields.slug,
        },
      })
    })

    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    _.each(results, edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: tagTemplate,
        context: {
          tag,
        },
      })
    })
  })
}
