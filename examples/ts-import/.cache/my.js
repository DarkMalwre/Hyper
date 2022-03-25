// conf.ts
var conf_default = {
  author: "SkylixGH",
  name: "HyperJS"
};

// my.ts
import path from "path";
import { fileURLToPath } from "url";
var fileName = fileURLToPath(import.meta.url);
var dirName = path.dirname(fileName);
console.log(conf_default);
console.log(`Dir: ${dirName}`);
console.log(`File: ${fileName}`);
