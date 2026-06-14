import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true
    },
    companyName: {
      type: String,
      required: [true, 'Please add a company name'],
      trim: true
    },
    eventType: {
      type: String,
      enum: [
        'Placement Drive',
        'Internship',
        'Workshop',
        'Hackathon',
        'Seminar',
        'Industry Visit',
        'Training Program'
      ],
      default: 'Placement Drive'
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    image: {
      type: String,
      default: ''
    },
    googleFormLink: {
      type: String,
      default: ''
    },
    registrationLink: {
      type: String,
      default: ''
    },
    eligibilityCriteria: {
      type: String,
      required: [true, 'Eligibility criteria is required'],
      trim: true
    },
    eventDate: {
      type: Date,
      required: [true, 'Please provide the event date']
    },
    deadline: {
      type: Date,
      required: [true, 'Please provide the application deadline']
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for id to match frontend expectation
eventSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Index to optimize event query
eventSchema.index({ eventDate: 1, deadline: 1 });

const Event = mongoose.model('Event', eventSchema);

export default Event;
