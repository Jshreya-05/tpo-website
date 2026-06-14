import mongoose from 'mongoose';

const contactSubmissionSchema = new mongoose.Schema(
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
      trim: true,
      default: ''
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true
    },
    org: {
      type: String,
      trim: true,
      default: ''
    },
    message: {
      type: String,
      trim: true,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Virtual for ID
contactSubmissionSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
contactSubmissionSchema.set('toJSON', { virtuals: true });
contactSubmissionSchema.set('toObject', { virtuals: true });

const ContactSubmission = mongoose.model('ContactSubmission', contactSubmissionSchema);
export default ContactSubmission;
