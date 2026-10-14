import { getCollection } from 'astro:content';
import categories from '../data/categories.json';
import techData from '../data/tech.json';

export type Tech = { label: string; icon?: string };
export const tech = techData as Record<string, Tech>;

/** Unknown stack entries still render, as plain text chips. */
export function techFor(key: string): Tech {
  return tech[key] ?? { label: key };
}

export async function getProjects() {
  const all = await getCollection('projects');
  return all
    .map((p) => ({ slug: p.id, ...p.data }))
    .sort((a, b) => a.order - b.order);
}
export type Project = Awaited<ReturnType<typeof getProjects>>[number];

export function groupProjects(projects: Project[]) {
  return categories
    .map((c) => ({ ...c, projects: projects.filter((p) => p.category === c.id) }))
    .filter((g) => g.projects.length > 0);
}
