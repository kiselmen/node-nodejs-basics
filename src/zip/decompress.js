import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createReadStream } from 'node:fs';
import { createWriteStream  } from 'node:fs';
import { createGunzip } from 'node:zlib';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const sourceFile = join(dirName, 'files', 'archive.gz');
const destinationFile = join(dirName, 'files', 'fileToCompress.txt');

const decompress = async () => {
	const sourceStream = createReadStream(sourceFile);
	const destinationStream = createWriteStream(destinationFile);

	sourceStream.pipe(createGunzip()).pipe(destinationStream);
};

await decompress();