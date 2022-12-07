import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createReadStream } from 'node:fs';

const fileName = fileURLToPath(import.meta.url);
const dirnNme = dirname(fileName);
const sourceFile = join(dirnNme, 'files', 'fileToRead.txt');

const read = async () => {
    const stream = createReadStream(sourceFile);

    stream.on('data', chunk => process.stdout.write(chunk.toString()));       
    stream.on('error', err => console.log('Error: ', err.message));
    };

await read();