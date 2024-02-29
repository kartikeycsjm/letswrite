import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  post: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

let postsc;

try {
  postsc = mongoose.model('postSchema');
} catch {
  postsc = mongoose.model('postSchema', postSchema);
}

export default postsc;
