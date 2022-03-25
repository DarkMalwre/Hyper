// hyperjs.ts
import { config } from "@hyper-stack/cli";

// plugins.ts
import CLIPluginJSTS from "@hyper-stack/cli-plugin-jsts";
import path from "path";
import { fileURLToPath } from "url";
var fileName = fileURLToPath(import.meta.url);
var dirName = path.dirname(fileName);
var plugins = [
  new CLIPluginJSTS({
    projects: [
      {
        path: "./packages/hello-printer",
        entry: "index.ts",
        distroTypes: {
          esm: "dist.mjs"
        }
      }
    ],
    performance: {
      parallelCompile: true
    }
  })
];
var plugins_default = plugins;

// hyperjs.ts
var hyperjs_default = config({
  plugins: plugins_default
});
export {
  hyperjs_default as default
};
