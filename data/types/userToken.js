import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'

import UserType from './user'

const UserTokenType = new GraphQLObjectType({
  name: 'UserTokenType',
  description: 'A person who uses the app',
  fields: () => ({
    userId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    token: {
      type: new GraphQLNonNull(GraphQLString),
    },
    user: {
      type: UserType,
      description: 'user',
    },
  }),
})

export default UserTokenType
