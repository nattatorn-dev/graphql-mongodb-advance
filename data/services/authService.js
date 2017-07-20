import { User as UserModel } from './../models'
import jwt from 'jwt-simple'
import _ from 'lodash'

const login = async ({username, password}) => {
  try {
    return UserModel.findOne({ username }).then(user => {
      if (!user || !user.isValidPassword(password)) {
        throw new Error('Username or password not match')
      }

      return Promise.resolve({
        _id: user._id,
        token: jwt.encode(
          { sub: user._id, iat: new Date().getTime(), login: user.username },
          process.env.SECRET,
        ),
      })
    })
  } catch (err) {
    return err
  }
}

module.exports = {
  login,
}
