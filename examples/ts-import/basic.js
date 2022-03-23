import TSImport from '@hyper-stack/ts-import';
import path from 'path';
import {fileURLToPath} from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

TSImport.compile(
	path.join(dirName, './my.ts'),
	path.join(dirName, './.cache/my.js')
).then(() => {
	console.log('compiled');

	TSImport.importCompiled(path.join(dirName, './.cache/my.js')).then((mod) => {
		console.log(mod);
	});
});
