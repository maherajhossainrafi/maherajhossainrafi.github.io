import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import categories from './data/categories.json';

const categoryIds = categories.map((c) => c.id) as [string, ...string[]];

const projects = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      shortName: z.string(),
      category: z.enum(categoryIds),
      kind: z.string(),
      order: z.number(),
      featured: z.boolean().default(false),
      summary: z.string(),
      stack: z.array(z.string()),
      links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
      media: z.object({ src: image(), alt: z.string() }).optional(),
      resume: z.string(),
    }),
});

export const collections = { projects };
