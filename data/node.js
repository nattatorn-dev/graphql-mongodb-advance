import {
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} from 'graphql'

import { commentService, postService, userService } from './services'
import { UserType, PostType, CommentType, TagType } from './types'

let nodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  description: 'An object with an ID',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object',
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The type of the object',
    },
  }),
  resolveType: obj => {
    if (obj.type === 'user') {
      return UserType
    } else if (obj.type === 'post') {
      return PostType
    } else if (obj.type === 'comment') {
      return CommentType
    } else if (obj.type === 'tag') {
      return TagType
    }
  },
})

let nodeField = {
  name: 'Node',
  type: nodeInterface,
  description: 'A node interface field',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Id of node interface',
    },
  },
  resolve: (obj, { id }) => {
    return User.getUserById(obj, { id: id })
      .then(user => {
        return user ? user : Post.getPostById(obj, { id: id })
      })
      .then(post => {
        return post ? post : Comment.getCommentById(obj, { id: id })
      })
      .then(comment => {
        return comment
      })
  },
}

module.exports = {
  nodeInterface: () => [nodeInterface], // wrap nodeInterface in a function
  nodeField: nodeField,
}
