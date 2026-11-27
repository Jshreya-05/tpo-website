export const PROGRAM_DEPARTMENTS = [
  { slug: 'mechanical', label: 'Mechanical Engineering', shortLabel: 'Mechanical' },
  { slug: 'civil', label: 'Civil Engineering', shortLabel: 'Civil' },
  { slug: 'electrical', label: 'Electrical Engineering', shortLabel: 'Electrical' },
  { slug: 'entc', label: 'Electronics & Telecommunication Engineering', shortLabel: 'E & TC' },
  { slug: 'computer', label: 'Computer Engineering', shortLabel: 'CSE' },
  { slug: 'aids', label: 'Artificial Intelligence & Data Science', shortLabel: 'AI & DS' },
];

export const PROGRAM_DEPARTMENT_SLUGS = PROGRAM_DEPARTMENTS.map((item) => item.slug);

export function isProgramDepartment(value) {
  return PROGRAM_DEPARTMENT_SLUGS.includes(value);
}
