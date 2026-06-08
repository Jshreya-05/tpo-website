// ─── Program / Training Card ───────────────────────────────────────────────

export interface Program {
  id: string
  title: string
  shortDesc: string
  tag: string
  tagColor: string
  tagTextColor: string
  icon: string
  gradient: string
  students: number
  duration: string
  description: string
  topics: string[]
  benefits: string[]
  url: string
}

// ─── Testimonial ───────────────────────────────────────────────────────────

export interface Testimonial {
  name: string
  role: string
  company: string
  batch: string
  text: string
  initials: string
  pkg: string
}

// ─── Gallery Item ──────────────────────────────────────────────────────────

export interface GalleryItem {
  id: number
  caption: string
  icon: string
  gradient: string
}

// ─── Timeline Step ─────────────────────────────────────────────────────────

export interface TimelineStep {
  step: string
  icon: string
  title: string
  desc: string
}

// ─── Resource ──────────────────────────────────────────────────────────────

export interface Resource {
  icon: string
  title: string
  desc: string
  badge: string
  bg: string
  path: string
}

// ─── Stat Card ─────────────────────────────────────────────────────────────

export interface StatItem {
  id: string
  icon: string
  target: number
  suffix: string
  prefix: string
  label: string
}

// ─── Nav Link ──────────────────────────────────────────────────────────────

export interface NavLink {
  label: string
  href: string
  isCta?: boolean
}

// ─── About Page Types ─────────────────────────────────────────────────────

export interface TeamMember {
  id: string
  name: string
  role: string
  desc: string
  imageUrl?: string
}

export interface Responsibility {
  id: string
  title: string
  desc: string
  iconName: string
}

export interface WhyUsPoint {
  id: string
  title: string
  desc: string
  icon: string
}
