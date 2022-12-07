import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createWriteStream  } from 'node:fs';

const fileName = fileURLToPath(import.meta.url);
const dirnNme = dirname(fileName);
const sourceFile = join(dirnNme, 'files', 'fileToWrite.txt');

const write = async () => {
	const writableStream = createWriteStream(sourceFile);
	process.stdin.resume();
	process.stdin.pipe(writableStream)

};

await write();