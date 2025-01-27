/// <reference types="node" />

import { promises as fs } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Get directory of script
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Navigate to icons directory relative to script location
const ICONS_DIR = join(__dirname, '../source/components/icons');
const OUTPUT_FILE = join(__dirname, '../source/library/icon-name.ts');
const SCHEMA_FILE = join(__dirname, '../public/json/schema.json');

// Create the type definition
async function generateIconNameType() {
  const files = await fs.readdir(ICONS_DIR);
  const iconNames = files
    .filter(
      (file) =>
        file.endsWith('.tsx') &&
        !file.includes('_icon') &&
        !file.includes('props')
    )
    .map((file) => `"${file.replace('.tsx', '')}"`)
    .join(' | ');

  const typeDefinition = `// This file is auto-generated. Do not edit manually.\nexport type IconName = ${iconNames};\n`;
  await fs.writeFile(OUTPUT_FILE, typeDefinition);
}

// Update the schema file with the new icons array
async function updateSchemaFile() {
  const schema = JSON.parse(await fs.readFile(SCHEMA_FILE, 'utf-8'));
  const iconNames = (await fs.readdir(ICONS_DIR))
    .filter(
      (file) =>
        file.endsWith('.tsx') &&
        !file.includes('_icon') &&
        !file.includes('props')
    )
    .map((file) => file.replace('.tsx', ''));

  schema.properties.goals.properties.added.items.properties.icon.enum =
    iconNames;
  await fs.writeFile(SCHEMA_FILE, JSON.stringify(schema, null, 2));
}

async function main() {
  await generateIconNameType();
  await updateSchemaFile();
}

main().catch(console.error);
