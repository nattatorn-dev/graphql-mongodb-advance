import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql'

import { userService, authService } from './../../services'
import UserType from '../user'
import UserTokenType from '../userToken'
import PostType from '../post'
import CommentType from '../comment'
import DateType from '../customScalars/date'

//import input types
// import { updatePost } from './post';

let CreateUserType = new GraphQLInputObjectType({
  name: 'createUser',
  description: 'A person who uses the app',
  // interfaces: nodeInterface,
  fields: () => ({
    username: {
      type: GraphQLString,
      description: 'username created by user',
    },
    email: {
      type: GraphQLString,
      description: "user's email address",
    },
    password: {
      type: GraphQLString,
      description: "user's password",
    },
  }),
})

let LoginUserType = new GraphQLInputObjectType({
  name: 'loginUser',
  description:
    'Use the user token, your app ID and app secret to make the following call from your server',
  fields: () => ({
    username: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'username created by user',
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: "user's password",
    },
  }),
})

let UpdateUserType = new GraphQLInputObjectType({
  name: 'updateUser',
  descriptions: 'changes to user profile',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    first_name: {
      type: GraphQLString,
    },
    last_name: {
      type: GraphQLString,
    },
    username: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    //TODO: create input object types for rest of these
    // posts: {
    //   type: new GraphQLList(Type),
    // },
    // comments: {
    //   type: new GraphQLList(CommentType),
    // },
    // friends: {
    //   type: new GraphQLList(UserType),
    // },
  }),
})

const UserMutations = {
  login: {
    type: UserTokenType,
    description: 'check user log in with app',
    args: {
      user: { type: LoginUserType },
    },
    resolve: async (root, { user: args }) => {
      const { _id, token } = await authService.login(args)
      const user = await userService.getUserById(_id)

      return Promise.resolve({
        user,
        token
      })
    },
  },
  createUser: {
    type: UserType,
    description: 'new user signs up with app',
    args: {
      user: { type: CreateUserType },
    },
    resolve: (root, { user }) => {
      return userService.createUser(user)
    },
  },
  updateUser: {
    type: UserType,
    description: 'user makes changes to profile',
    args: {
      user: { type: UpdateUserType },
    },
    resolve: (root, { user }) => {
      return userService.updateUser(user)
    },
  },
}

export default UserMutations
