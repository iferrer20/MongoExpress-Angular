import mongoose, { Schema } from 'mongoose';

const field = (type, required = true) => ({ type, required });
const ObjId = Schema.Types.ObjectId;

const followersSchema = mongoose.Schema({ // Many to many
  fromUser: {
    ...field(ObjId),
    ref: 'User'
  },
  toUser: {
    ...field(ObjId),
    ref: 'User'
  }
});

export default mongoose.model('Followers', followersSchema);


