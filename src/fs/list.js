import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdir, stat } from 'node:fs/promises';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const sourceDir = join(dirName, 'files');

const isExistItem = async (path, item) => {
    return item === 'file' ? 
        await stat(path).then(itemType => itemType.isFile()).catch(error => error.code !== 'ENOENT') : 
        await stat(path).then(itemType => itemType.isDirectory()).catch(error => error.code !== 'ENOENT')
}

const list = async () => {
	const isExist = await isExistItem(sourceDir, 'directory');

	if (!isExist) throw new Error('FS operation failed');

	(await readdir(sourceDir)).forEach(item => console.log(item));
};

await list();