const { Schema, model } = require('mongoose');

const NotificationSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['like', 'comment', 'follow', 'mention', 'custom'], // example types
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // ✅ automatically adds createdAt & updatedAt
  }
);

module.exports = model('Notification', NotificationSchema);
