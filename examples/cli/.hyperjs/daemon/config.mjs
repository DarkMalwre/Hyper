// hyperjs.ts
import { config } from "@hyper-stack/cli";
import CLIPluginJSTS from "@hyper-stack/cli-plugin-jsts";
var hyperjs_default = config({
  plugins: [new CLIPluginJSTS()]
});
export {
  hyperjs_default as default
};
