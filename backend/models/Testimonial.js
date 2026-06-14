import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true
    },
    company: {
      type: String,
      required: [true, 'Company is required'],
      trim: true
    },
    batch: {
      type: String,
      required: [true, 'Batch is required'],
      trim: true
    },
    text: {
      type: String,
      required: [true, 'Quote text is required'],
      trim: true
    },
    initials: {
      type: String,
      required: [true, 'Initials are required'],
      trim: true
    },
    pkg: {
      type: String,
      required: [true, 'Package is required'],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Virtual for ID
testimonialSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
testimonialSchema.set('toJSON', { virtuals: true });
testimonialSchema.set('toObject', { virtuals: true });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
