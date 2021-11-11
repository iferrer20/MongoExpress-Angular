import mongoose from 'mongoose';
import { allResolved } from '../utils';
import User from './User';

const ObjectId = mongoose.Schema.Types.ObjectId;
const field = (type, required = true) => ({ type, required });

const commentSchema = mongoose.Schema({
  text: { 
    minlength: [1, 'Message too short'],
    maxlength: [200, 'Message too long'],
    ...field(String)
  },
  repliedComments: [
    {
      ...field(ObjectId),
      ref: 'Comment'
    }
  ],
  commentReplied: {
    type: ObjectId
  },
  user: {
    ...field(ObjectId),
    ref: 'User'
  }
});

commentSchema.methods.toJSON = async function () {
  const _user = await User.findById(this.user).exec();

  const user = {
    id: _user._id,
    username: _user.username
  }

  return {
    id: this._id,
    text: this.text,
    user: user,
    repliedComments: (await allResolved(this.repliedComments.map(async c => { 
      c = await Comment.findById(c).exec();
      if (c) {
        return await c.toJSON(c);
      }
    }))).filter(i => i != null) // Recursive comment populate json
  }
}

commentSchema.methods.reply = async function () {
  await Comment.findOneAndUpdate({ _id: this.commentReplied }, {$push: {repliedComments: this._id}}).exec();
}

commentSchema.methods.delete = async function (user) {
  await Comment.findOneAndRemove({_id: this._id, user: user._id}).exec();
}
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;