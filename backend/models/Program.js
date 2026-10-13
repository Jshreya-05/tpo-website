import mongoose from 'mongoose';
import { PROGRAM_DEPARTMENT_SLUGS } from '../constants/departments.js';

const programSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    shortDesc: {
      type: String,
      required: [true, 'Please add a short description'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    tag: {
      type: String,
      default: 'Training',
      trim: true,
    },
    tagColor: {
      type: String,
      default: '#DBEAFE',
    },
    tagTextColor: {
      type: String,
      default: '#1D4ED8',
    },
    icon: {
      type: String,
      default: '💻',
    },
    gradient: {
      type: String,
      default: 'linear-gradient(135deg,#1B4FD8 0%,#0A1628 100%)',
    },
    students: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
      required: [true, 'Please add a duration'],
      trim: true,
    },
    topics: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    url: {
      type: String,
      default: '',
      trim: true,
    },
    department: {
      type: String,
      enum: [...PROGRAM_DEPARTMENT_SLUGS, null],
      default: null,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

programSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

programSchema.index({ department: 1, status: 1, sortOrder: 1 });

const Program = mongoose.model('Program', programSchema);

export default Program;
