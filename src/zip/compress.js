import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createReadStream } from 'node:fs';
import { createWriteStream  } from 'node:fs';
import { createGzip } from 'node:zlib';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const sourceFile = join(dirName, 'files', 'fileToCompress.txt');
const destinationFile = join(dirName, 'files', 'archive.gz');

const compress = async () => {
	const sourceStream = createReadStream(sourceFile);
	const destinationStream = createWriteStream(destinationFile);

	sourceStream.pipe(createGzip()).pipe(destinationStream);
};

await compress();