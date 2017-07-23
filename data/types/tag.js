import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'

import { nodeInterface } from './../node'
import DateType from './customScalars/date'
import { UserType, PostType } from './'

let TagType = new GraphQLObjectType({
  name: 'Tag',
  description: 'a Tag created by a user',
  interfaces: nodeInterface,
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: GraphQLString,
      description: 'content of comment',
    },
    _creator: {
      type: UserType,
      description: 'user who wrote the comment',
    },
    post: {
      type: PostType,
      description: 'post from which comment was made',
    },
    created_at: {
      type: DateType,
      description: 'date the note was created',
    },
    updated_at: {
      type: DateType,
      description: 'date user updated comment',
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
})

export default TagType
