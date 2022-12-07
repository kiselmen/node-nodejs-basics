import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rename as renameFile, stat } from 'node:fs/promises';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const wrongFile = join(dirName, 'files', 'wrongFilename.txt');
const properFile = join(dirName, 'files', 'properFilename.md');

const isExistItem = async (path, item) => {
    return item === 'file' ? 
        await stat(path).then(itemType => itemType.isFile()).catch(error => error.code !== 'ENOENT') : 
        await stat(path).then(itemType => itemType.isDirectory()).catch(error => error.code !== 'ENOENT')
}

const rename = async () => {
	const isWrongExist = await isExistItem(wrongFile, 'file');
	const isProperExist = await isExistItem(properFile, 'file');

	if (!isWrongExist) throw new Error('FS operation failed');
    if (isProperExist) throw new Error('FS operation failed');

	await renameFile(wrongFile, properFile)
};

await rename();