import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;
const field = (type, required = true) => ({ type, required });

const commentSchema = mongoose.Schema({
  text: { 
    min: [4, 'Message too short'],
    max: [200, 'Message too long'],
    ...field(String)
  },
  reply: {
    type: ObjectId,
    ref: 'Comment',
    required: false
  },
  user: {
    ...field(ObjectId),
    ref: 'User'
  }
});

commentSchema.methods.toJSON = function () {
  const user = this.user.toObject();
  user.id = user._id;
  delete user._id;

  return {
    id: this._id,
    text: this.text,
    user: user
  }
}

commentSchema.methods.delete = async function (user) {
  await Comment.findOneAndRemove({_id: this._id, user: user._id}).exec();
}
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;