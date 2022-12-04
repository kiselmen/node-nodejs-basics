import { Transform } from 'node:stream';

const transformedStrem = new Transform({
	transform(chunk, encoding, callback) {
		callback(null, chunk.reverse() + '\n');
	},
});

const transform = async () => {
	process.stdin.pipe(transformedStrem).pipe(process.stdout);
};

await transform();