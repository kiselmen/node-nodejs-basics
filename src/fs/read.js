import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile, stat } from 'node:fs/promises';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const sourceFile = join(dirName, 'files', 'fileToRead.txt');

const isExistItem = async (path, item) => {
    return item === 'file' ? 
        await stat(path).then(itemType => itemType.isFile()).catch(error => error.code !== 'ENOENT') : 
        await stat(path).then(itemType => itemType.isDirectory()).catch(error => error.code !== 'ENOENT')
}

const read = async () => {
	const isExist = await isExistItem(sourceFile, 'file');

	if (!isExist) throw new Error('FS operation failed');

	console.log(await readFile(sourceFile, 'utf-8'));
};

await read();