import mongoose from 'mongoose'

const configurationsSchema = mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  schema: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  }
})

export default mongoose.model('configurations', configurationsSchema)