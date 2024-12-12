import fs from 'fs/promises';

export async function readFile(filePath, isParsed) {
  if (!filePath) return null;

  const data = await fs.readFile(filePath, 'utf-8');
  return isParsed ? JSON.parse(data) : data;
}

export async function writeFile(filePath, data, isStringify) {
  if (!filePath) return null;

  await fs.writeFile(filePath, isStringify ? JSON.stringify(data) : data);
}
