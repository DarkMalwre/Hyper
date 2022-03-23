import conf from './conf';
import path from 'path';
import {fileURLToPath} from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

console.log(conf);
console.log(`Dir: ${dirName}`);
console.log(`File: ${fileName}`);
