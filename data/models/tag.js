import mongoose from 'mongoose'

let TagSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    default: mongoose.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  type: String,
})

export default mongoose.model('Tag', TagSchema)
