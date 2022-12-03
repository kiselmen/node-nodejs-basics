import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rm, stat } from 'node:fs/promises';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const fileToRemove = join(dirName, 'files', 'fileToRemove.txt');

const isExistItem = async (path, item) => {
    return item === 'file' ? 
        await stat(path).then(itemType => itemType.isFile()).catch(error => error.code !== 'ENOENT') : 
        await stat(path).then(itemType => itemType.isDirectory()).catch(error => error.code !== 'ENOENT')
}

const remove = async () => {
	const isExist = await isExistItem(fileToRemove, 'file');
	if (!isExist) throw new Error('FS operation failed');

	await rm(fileToRemove);
};

await remove();