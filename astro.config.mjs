import { defineConfig } from 'astro/config';
import site from './src/data/site.json' with { type: 'json' };

// User site (<username>.github.io): served from the domain root, so base is "/".
// For a project site (<username>.github.io/<repo>) set "base" in src/data/site.json to "/<repo>/".
export default defineConfig({
  site: site.url,
  base: site.base,
  trailingSlash: 'ignore',
  build: { assets: 'assets' },
});
