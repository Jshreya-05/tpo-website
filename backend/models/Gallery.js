import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true
    },
    year: {
      type: String,
      required: [true, 'Please specify the academic year']
    },
    category: {
      type: String,
      default: 'General'
    },
    activityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Activity',
      required: false
    },
    imageUrl: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Indexes for faster filtering and sorting
gallerySchema.index({ year: -1 });
gallerySchema.index({ category: 1 });
gallerySchema.index({ activityId: 1 });

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
