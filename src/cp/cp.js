import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const fileName = fileURLToPath(import.meta.url);
const dirnNme = dirname(fileName);
const scriptSource = join(dirnNme, 'files', 'script.js');

const spawnChildProcess = async (args) => {
    const childProcess = spawn('node', [scriptSource, ...args]);

    process.stdin.pipe(childProcess.stdin);

    childProcess.stdout.on('data', (data)=>{
        console.log(data.toString());
    })
};

spawnChildProcess(['A1', 'A2', 'A3']);