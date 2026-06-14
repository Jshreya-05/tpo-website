import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    enableCursorEffects: {
      type: Boolean,
      default: true
    },
    enableMarqueeBar: {
      type: Boolean,
      default: true
    },
    enableHomepageAnimations: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Setting = mongoose.model('Setting', settingSchema);
export default Setting;
