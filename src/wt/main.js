import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Worker } from 'node:worker_threads';
import { cpus } from 'node:os';

const fileName = fileURLToPath(import.meta.url);
const dirnNme = dirname(fileName);
const workerSource = join(dirnNme, 'worker.js');

const runServices = async () => {

    const responseServices = [];

    for (let i = 0; i < cpus().length; i++) {
        const result = await new Promise((resolve, reject) => {
            const service = new Worker(workerSource, {workerData: i + 10});
            service.on('message', resolve);
            service.on('error', reject);
        })            
        .then(data => ({status: 'resolved', data}))
        .catch(() => ({status: 'error', data: null}));
        responseServices.push(result);
    }

    return responseServices;
};

const performCalculations = async () => {
	console.log(await runServices());
};

await performCalculations();