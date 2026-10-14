// Runs before `npm run build`. Warns locally, fails in CI (GitHub Actions sets CI=true)
// so a placeholder can never be deployed by accident.
import { readFileSync } from 'node:fs';
const site = JSON.parse(readFileSync(new URL('../src/data/site.json', import.meta.url), 'utf8'));
const problems = [];
if (!site.email || /REPLACE/i.test(site.email) || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(site.email))
  problems.push('src/data/site.json: "email" is still a placeholder. The Email button needs your real address.');
if (site.linkedin && !/^https:\/\/([a-z]+\.)?linkedin\.com\//i.test(site.linkedin))
  problems.push('src/data/site.json: "linkedin" must be a https://www.linkedin.com/in/... URL (or "" to hide it).');
if (problems.length) {
  for (const p of problems) console.warn('⚠  ' + p);
  if (process.env.CI) { console.error('Refusing to build in CI with placeholders.'); process.exit(1); }
}
