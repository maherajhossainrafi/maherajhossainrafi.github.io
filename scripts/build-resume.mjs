// Builds public/resume/<file>.pdf: a one-page, text-based, single-column, ATS-friendly resume.
// Content comes from the same data files as the website, so the two cannot drift apart.
// Run with: npm run resume   (pure Node, no LaTeX needed)
import PDFDocument from 'pdfkit';
import { createWriteStream, mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const json = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const site = json('src/data/site.json');
const profile = json('src/data/profile.json');
const tech = json('src/data/tech.json');
const skills = json('src/data/skills.json');
const projects = readdirSync(join(root, 'src/content/projects')).filter((f) => f.endsWith('.json'))
  .map((f) => json(`src/content/projects/${f}`)).sort((a, b) => a.order - b.order);

const NAVY = '#1a56db', INK = '#1c1f24', MUTED = '#4a505a';
const fonts = join(root, 'resume/fonts');
const out = join(root, 'public', site.resume.file);
mkdirSync(dirname(out), { recursive: true });

const doc = new PDFDocument({
  size: 'A4', margins: { top: 34, bottom: 30, left: 44, right: 44 }, bufferPages: true,
  info: { Title: `${site.name} - Resume`, Author: site.name, Subject: 'Resume' },
});
doc.registerFont('R', join(fonts, 'IBMPlexSans-Regular.ttf'));
doc.registerFont('M', join(fonts, 'IBMPlexSans-Medium.ttf'));
doc.registerFont('B', join(fonts, 'IBMPlexSans-SemiBold.ttf'));
doc.registerFont('I', join(fonts, 'IBMPlexSans-Italic.ttf'));
const stream = createWriteStream(out);
doc.pipe(stream);

const W = doc.page.width - 88;
const hasEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(site.email);
const label = (k) => tech[k]?.label ?? k;

// Header
doc.font('B').fontSize(20).fillColor(INK).text(site.name, { lineGap: 0 });
doc.moveDown(0.15);
const contact = [`${site.location} (${site.utc})`];
if (hasEmail) contact.push(site.email);
doc.font('R').fontSize(9).fillColor(MUTED).text(contact.join('   |   '), { lineGap: 1 });
const links = [];
if (site.linkedin) links.push(['LinkedIn: ' + site.linkedin.replace(/^https?:\/\//, ''), site.linkedin]);
links.push(['GitHub: ' + site.github.replace(/^https?:\/\//, ''), site.github]);
links.forEach(([t, u]) => doc.fillColor(NAVY).text(t, { link: u, underline: false, lineGap: 1 }));

function section(title) {
  doc.moveDown(0.55);
  doc.font('B').fontSize(10.5).fillColor(NAVY).text(title.toUpperCase(), { characterSpacing: 0.6 });
  const y = doc.y + 1;
  doc.moveTo(44, y).lineTo(44 + W, y).lineWidth(0.7).strokeColor(NAVY).stroke();
  doc.y = y + 4; doc.x = 44;
}
const body = (t, o = {}) => doc.font('R').fontSize(9.2).fillColor(INK).text(t, { lineGap: 1.2, ...o });

section('Summary');
body('Computer Science and Engineering undergraduate who builds full-stack web applications and microcontroller-based systems, with C++ data-structure projects and daily problem-solving practice on LeetCode. Experience applying machine learning and deep learning models to classification and detection.');

const e = profile.education;
section('Education');
doc.font('B').fontSize(9.6).fillColor(INK).text(e.degree, { continued: true, lineGap: 1.2 });
doc.font('R').text(`   ${e.period}`, { align: 'right' });
body(e.institution);
body(`CGPA: ${e.cgpa} / ${e.cgpaScale}`);

section('Technical Skills');
for (const g of skills.groups) {
  const items = g.items.map((i) => label(i.tech) + (i.status === 'learning' ? ' (learning)' : ''));
  doc.font('B').fontSize(9.2).fillColor(INK).text(`${g.title}: `, { continued: true, lineGap: 1.2 });
  doc.font('R').text(items.join(', '));
}

section('Projects');
for (const p of projects) {
  doc.moveDown(0.18);
  doc.font('B').fontSize(9.4).fillColor(INK).text(p.name, { continued: true, lineGap: 1 });
  doc.font('I').fontSize(8.6).fillColor(MUTED).text(`  |  ${p.stack.map(label).join(', ')}`);
  doc.font('R').fontSize(9).fillColor(INK).text('•  ' + p.resume, { indent: 0, lineGap: 1, paragraphGap: 0 });
}

section('Research Experience');
for (const r of profile.research.papers) {
  doc.font('R').fontSize(9.2).fillColor(INK).text(`•  ${r.title}: ${r.method.toLowerCase()} (paused).`, { lineGap: 1.2 });
}

const pages = doc.bufferedPageRange().count;
doc.end();
await new Promise((r) => stream.on('finish', r));
console.log(`Wrote ${out} (${pages} page${pages === 1 ? '' : 's'})`);
if (pages !== 1) { console.error('Resume spills onto more than one page. Shorten the content.'); process.exit(1); }
if (!hasEmail) console.warn('Note: email is still a placeholder, so the resume has no email line yet. Set it in src/data/site.json and run npm run resume again.');
