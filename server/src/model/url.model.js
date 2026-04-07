import mongoose from 'mongoose';

const URLSchema = mongoose.Schema(
  {
    shortUrl: {
      type: String,
      unique: true,
    },
    longUrl: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const URLModel = mongoose.model('url', URLSchema);

export default URLModel;
