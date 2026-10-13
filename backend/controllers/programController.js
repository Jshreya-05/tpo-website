import Program from '../models/Program.js';
import { PROGRAM_DEPARTMENTS, isProgramDepartment } from '../constants/departments.js';
import { validateProgram } from '../validators/programValidator.js';

function toStringArray(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === 'string') {
    return value
      .split(/\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function slugify(value = '') {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function formatProgram(program) {
  const doc = program.toObject ? program.toObject() : program;
  return {
    ...doc,
    id: doc._id?.toString?.() || doc.id,
  };
}

function departmentQuery(department) {
  if (!department || department === 'all') return {};
  if (department === 'unassigned') {
    return {
      $or: [{ department: null }, { department: { $exists: false } }, { department: '' }],
    };
  }
  if (!isProgramDepartment(department)) return null;
  return { department };
}

function buildProgramPayload(body, extras = {}) {
  return {
    slug: slugify(body.slug || body.title),
    title: body.title,
    shortDesc: body.shortDesc,
    description: body.description,
    tag: body.tag || 'Training',
    tagColor: body.tagColor || '#DBEAFE',
    tagTextColor: body.tagTextColor || '#1D4ED8',
    icon: body.icon || '💻',
    gradient: body.gradient || 'linear-gradient(135deg,#1B4FD8 0%,#0A1628 100%)',
    students: Number(body.students) || 0,
    duration: body.duration,
    topics: toStringArray(body.topics),
    benefits: toStringArray(body.benefits),
    url: body.url || '',
    department: body.department,
    status: body.status || 'published',
    sortOrder: Number(body.sortOrder) || 0,
    ...extras,
  };
}

export const getDepartments = (_req, res) => {
  res.json({ success: true, data: PROGRAM_DEPARTMENTS });
};

export const getPrograms = (req, res) => listPrograms(req, res, { includeAllStatuses: false });

export const getAdminPrograms = (req, res) => listPrograms(req, res, { includeAllStatuses: true });

async function listPrograms(req, res, { includeAllStatuses }) {
  try {
    const { search, status, department, page = 1, limit = 50 } = req.query;
    const deptFilter = departmentQuery(department);
    if (deptFilter === null) {
      return res.status(400).json({ success: false, message: 'Invalid department filter' });
    }

    const query = { ...deptFilter };

    if (!includeAllStatuses) {
      query.status = 'published';
    } else if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$and = [
        ...(query.$and || []),
        {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { shortDesc: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { tag: { $regex: search, $options: 'i' } },
          ],
        },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const programs = await Program.find(query)
      .sort({ sortOrder: 1, createdAt: 1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();
    const total = await Program.countDocuments(query);

    res.json({
      success: true,
      count: programs.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)) || 1,
      data: programs.map(formatProgram),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    res.json({ success: true, data: formatProgram(program) });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const createProgram = async (req, res) => {
  try {
    const { error } = validateProgram(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((item) => item.message).join(', '),
      });
    }

    let slug = slugify(req.body.slug || req.body.title);
    if (!slug) slug = `program-${Date.now()}`;
    const existing = await Program.findOne({ slug });
    if (existing) slug = `${slug}-${Date.now().toString().slice(-6)}`;

    const program = await Program.create(
      buildProgramPayload(req.body, { slug, createdBy: req.user._id })
    );

    res.status(201).json({ success: true, data: formatProgram(program) });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }

    const { error } = validateProgram(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((item) => item.message).join(', '),
      });
    }

    let slug = slugify(req.body.slug || req.body.title || program.slug);
    if (slug !== program.slug) {
      const clash = await Program.findOne({ slug, _id: { $ne: program._id } });
      if (clash) slug = `${slug}-${Date.now().toString().slice(-6)}`;
    }

    const updated = await Program.findByIdAndUpdate(
      req.params.id,
      buildProgramPayload(req.body, { slug, updatedBy: req.user._id }),
      { new: true, runValidators: true }
    );

    res.json({ success: true, data: formatProgram(updated) });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    res.json({ success: true, message: 'Program deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
