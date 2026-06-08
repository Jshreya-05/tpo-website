import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: [
        'Placement Drive',
        'Workshop',
        'Seminar',
        'Bootcamp',
        'Guest Lecture'
      ]
    },
    year: {
      type: Number,
      required: [true, 'Please specify the academic year']
    },
    eventDate: {
      type: Date,
      required: [true, 'Please provide the event date']
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    images: {
      type: [String],
      default: []
    },
    companyName: {
      type: String,
      default: ''
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for id to match frontend expectation
activitySchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Indexes to optimize sorting and text search
activitySchema.index({ category: 1, year: -1 });
activitySchema.index(
  { title: 'text', description: 'text', companyName: 'text' },
  { weights: { title: 5, companyName: 3, description: 1 } }
);

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;

