import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { copyFile, mkdir, readdir, stat } from 'node:fs/promises';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const source = join(dirName, 'files');
const destination = join(dirName, 'files_copy');

const isExistItem = async (path, item) => {
    return item === 'file' ? 
        await stat(path).then(itemType => itemType.isFile()).catch(error => error.code !== 'ENOENT') : 
        await stat(path).then(itemType => itemType.isDirectory()).catch(error => error.code !== 'ENOENT')
}

const copyDir = async (source, destination) => {
    const items = await readdir(source);
    await mkdir(destination);
    
    for (const item of items) {
        const itemSourcePath = join(source, item);
        const itemType = await stat(itemSourcePath)
    
        if (itemType.isFile()) {
            const itemDestPath = join(destination, item);
            await copyFile(itemSourcePath, itemDestPath)
        } else if (itemType.isDirectory()) {
            await copyDir(join(source, item), join(destination, item));
        }
    }
}

const copy = async () => {
	const isSourceExist = await isExistItem(source, 'directory');
    if (!isSourceExist) throw new Error('FS operation failed');

    const isDestinationExist = await isExistItem(destination, 'directory');
	if (isDestinationExist) throw new Error('FS operation failed');

	await copyDir(source, destination);
};

copy();