# graphql-mongodb-backend-example


This is a basic backend boilerplate for setting up a graphql server with mongodb and express.

## installation
```
npm install
```

```
npm start
```

## GraphQL
go to http://localhost:8080/graphql to work with the graphqil to make queries
from schema.js
root query is:

```Javascript
export var Schema = new GraphQLSchema({
  query: QueryType,
});
```
QueryType has these fields that can be queried on: in types/query.js
- node
- users : retrieves all users
- user(id) : retrieves user by id
- posts : retrieves all posts
- post(id) : retrieves post by id
- comments : retrieves all  comments
- comment(id) : retrieves all comments by id

graphiql queries look like this:
![graphiql screenshot](http://i68.tinypic.com/1zz486p.png)
## Database
### Models
- user
- post
- comment

Example schema in [model].js
```Javascript
import mongoose from 'mongoose';

let newModelSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: mongoose.Types.ObjectId,
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //add in field for graphql type
  type: {
    type: String,
  }
})

export default mongoose.model('User', UserSchema);
