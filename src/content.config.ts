import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const link = z.object({ label: z.string(), href: z.url() });

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    line: z.string(), // one short line for lists
    year: z.string(),
    kind: z.string(),
    stack: z.array(z.string()),
    links: z.array(link).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

const lab = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/lab' }),
  schema: z.object({
    title: z.string(),
    line: z.string(),
    year: z.number(),
    category: z.enum(['Web', 'Hardware', 'ML', 'Tools', 'Games']),
    links: z.array(link).default([]),
  }),
});

export const collections = { blog, projects, lab };
