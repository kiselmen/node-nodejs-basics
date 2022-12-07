import { writeFile, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const filePath = join(dirName, 'files', 'fresh.txt');

const isExistItem = async (path, item) => {
    return item === 'file' ? 
        await stat(path).then(itemType => itemType.isFile()).catch(error => error.code !== 'ENOENT') : 
        await stat(path).then(itemType => itemType.isDirectory()).catch(error => error.code !== 'ENOENT')
}

const create = async () => {
	const isFileExist = await isExistItem(filePath, 'file');

	if (isFileExist) throw new Error('FS operation failed');

	await writeFile(filePath, 'I am fresh and young');
};

await create();