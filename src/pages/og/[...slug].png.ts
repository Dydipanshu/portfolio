import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { site } from '../../data/site';

type Card = { eyebrow: string; title: string; subtitle?: string };

export const getStaticPaths = (async () => {
  const projects = await getCollection('projects');
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const cards: Record<string, Card> = {
    default: { eyebrow: '', title: site.name, subtitle: 'Backend software engineer, Noida, India' },
    projects: { eyebrow: 'Work', title: 'Things I’ve built' },
    lab: { eyebrow: 'Lab', title: 'Small things I made to learn something' },
    blog: { eyebrow: 'Writing', title: 'Writing' },
    about: { eyebrow: 'About', title: site.name, subtitle: 'Software engineer in Noida, India' },
    resume: { eyebrow: 'Résumé', title: site.name },
  };
  for (const p of projects) cards[`projects/${p.id}`] = { eyebrow: `${p.data.kind}, ${p.data.year}`, title: p.data.title, subtitle: p.data.line };
  for (const p of posts) cards[`blog/${p.id}`] = { eyebrow: 'Writing', title: p.data.title, subtitle: p.data.description };
  return Object.entries(cards).map(([slug, card]) => ({ params: { slug }, props: card }));
}) satisfies GetStaticPaths;

const font = (p: string) => readFile(join(process.cwd(), 'node_modules', p));
let fonts: Awaited<ReturnType<typeof loadFonts>> | undefined;
const loadFonts = async () => [
  { name: 'Sans', data: await font('@fontsource/geist/files/geist-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
  { name: 'Sans', data: await font('@fontsource/geist/files/geist-latin-500-normal.woff'), weight: 500 as const, style: 'normal' as const },
];

const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });

// A little signal trace along the bottom, echoing the hero
const trace = (() => {
  const pts: string[] = [];
  for (let i = 0; i <= 240; i++) {
    const x = (i / 240) * 1200;
    const env = Math.sin(Math.PI * (i / 240)) ** 1.5;
    const y = 40 + env * (18 * Math.sin(i / 240 * 9) + 9 * Math.sin(i / 240 * 23) + 4 * Math.sin(i / 240 * 47));
    pts.push(`${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="80"><path d="${pts.join('')}" fill="none" stroke="#1c1c1a" stroke-width="2"/></svg>`,
  )}`;
})();

export const GET: APIRoute = async ({ props }) => {
  const { eyebrow, title, subtitle } = props as Card;
  fonts ??= await loadFonts();
  const size = title.length > 40 ? 60 : title.length > 24 ? 72 : 84;

  const svg = await satori(
    h(
      'div',
      { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#fcfcfb', color: '#1c1c1a', fontFamily: 'Sans' },
      [
        h('div', { display: 'flex', flexDirection: 'column', flex: 1, padding: '64px 72px 0' }, [
          h('div', { display: 'flex', justifyContent: 'space-between', fontFamily: 'Sans', fontSize: 26, color: '#74736e' }, [
            h('div', { display: 'flex' }, eyebrow),
            h('div', { display: 'flex' }, site.url.replace('https://', '')),
          ]),
          h('div', { display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }, [
            h('div', { fontSize: size, fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.03em', maxWidth: 1000 }, title),
            subtitle
              ? h('div', { marginTop: 24, fontSize: 30, lineHeight: 1.4, color: '#74736e', maxWidth: 940 }, subtitle.length > 140 ? subtitle.slice(0, 137) + '…' : subtitle)
              : null,
          ]),
          h('div', { display: 'flex', fontSize: 26, color: '#74736e' }, eyebrow ? site.name : ''),
        ]),
        { type: 'img', props: { src: trace, width: 1200, height: 80, style: { marginTop: 24 } } },
      ],
    ) as never,
    { width: 1200, height: 630, fonts },
  );

  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
