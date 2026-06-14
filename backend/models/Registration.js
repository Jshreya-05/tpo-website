import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    branch: {
      type: String,
      required: [true, 'Branch is required'],
      trim: true
    },
    year: {
      type: String,
      required: [true, 'Year of study is required'],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Virtual for ID
registrationSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
registrationSchema.set('toJSON', { virtuals: true });
registrationSchema.set('toObject', { virtuals: true });

const Registration = mongoose.model('Registration', registrationSchema);
export default Registration;
