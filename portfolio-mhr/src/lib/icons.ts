import * as simple from 'simple-icons';
import * as extra from '../icons/extra.js';
import mail from 'lucide-static/icons/mail.svg?raw';
import download from 'lucide-static/icons/download.svg?raw';
import sun from 'lucide-static/icons/sun.svg?raw';
import moon from 'lucide-static/icons/moon.svg?raw';
import external from 'lucide-static/icons/arrow-up-right.svg?raw';
import pin from 'lucide-static/icons/map-pin.svg?raw';
import copy from 'lucide-static/icons/copy.svg?raw';
import check from 'lucide-static/icons/check.svg?raw';

type Glyph = { title: string; path: string };
const brands = { ...(simple as unknown as Record<string, Glyph>), ...(extra as Record<string, Glyph>) };

/** Official brand glyph (simple-icons, CC0) or undefined when no official mark exists. */
export function brand(name: string | undefined): Glyph | undefined {
  return name ? brands[name] : undefined;
}

// Lucide UI icons (ISC). Normalised so CSS controls size and colour.
const clean = (svg: string) =>
  svg
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<svg[^>]*>/, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">')
    .trim();

export const ui: Record<string, string> = {
  mail: clean(mail),
  download: clean(download),
  sun: clean(sun),
  moon: clean(moon),
  external: clean(external),
  pin: clean(pin),
  copy: clean(copy),
  check: clean(check),
};
