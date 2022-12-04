import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const fileName = fileURLToPath(import.meta.url);
const dirnNme = dirname(fileName);
const sourceFile = join(dirnNme, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
	const hash = createHash('sha256', '').update(await readFile(sourceFile)).digest('hex');
	console.log(hash);
};

await calculateHash();