// server/src/models/Issue.js
const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    city: { type: String, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String, default: 'https://via.placeholder.com/500' },
    reporterId: { type: String, required: true },
    status: { type: String, default: 'open' },
    upvoteCount: { type: Number, default: 0 },
    upvoters: { type: [String], default: [] },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

module.exports = mongoose.model('Issue', issueSchema);
