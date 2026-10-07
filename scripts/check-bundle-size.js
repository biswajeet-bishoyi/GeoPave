#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BUNDLE_LIMIT_KB = 500;
const distDir = path.join(__dirname, '../dist');

function getFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getFiles(res));
    } else if (entry.name.endsWith('.js')) {
      files.push(res);
    }
  }
  return files;
}

const jsFiles = getFiles(distDir);

if (jsFiles.length === 0) {
  console.log('⚠️ No built JS files found in dist/');
  process.exit(0);
}

let exceeded = false;
console.log('📦 Bundle size check:');
for (const file of jsFiles) {
  const sizeKB = (fs.statSync(file).size / 1024).toFixed(2);
  const relPath = path.relative(distDir, file);
  console.log(`  - ${relPath}: ${sizeKB} KB`);
  if (parseFloat(sizeKB) > BUNDLE_LIMIT_KB) {
    console.error(`❌ EXCEEDED: ${relPath} (${sizeKB} KB > ${BUNDLE_LIMIT_KB} KB)`);
    exceeded = true;
  }
}

if (exceeded) {
  process.exit(1);
} else {
  console.log(`✅ All JS chunks under ${BUNDLE_LIMIT_KB} KB limit`);
}
