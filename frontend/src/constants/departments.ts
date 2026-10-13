export const PROGRAM_DEPARTMENTS = [
  { slug: 'mechanical', label: 'Mechanical Engineering', shortLabel: 'Mechanical' },
  { slug: 'civil', label: 'Civil Engineering', shortLabel: 'Civil' },
  { slug: 'electrical', label: 'Electrical Engineering', shortLabel: 'Electrical' },
  { slug: 'entc', label: 'Electronics & Telecommunication Engineering', shortLabel: 'ENTC' },
  { slug: 'computer', label: 'Computer Engineering', shortLabel: 'Computer' },
  { slug: 'aids', label: 'Artificial Intelligence & Data Science', shortLabel: 'AIDS' },
] as const;

export type ProgramDepartmentSlug = (typeof PROGRAM_DEPARTMENTS)[number]['slug'];

export function getDepartmentLabel(slug?: string | null, short = false) {
  const match = PROGRAM_DEPARTMENTS.find((item) => item.slug === slug);
  if (!match) return slug ? slug : 'Needs department';
  return short ? match.shortLabel : match.label;
}
