// hyperjs.ts
import { config } from "@hyper-stack/cli";

// plugins.ts
import CLIPluginJSTS from "@hyper-stack/cli-plugin-jsts";
import CLIPluginDTS from "@hyper-stack/cli-plugin-dts";
var plugins = [
  new CLIPluginDTS(),
  new CLIPluginJSTS()
];
var plugins_default = plugins;

// hyperjs.ts
var hyperjs_default = config({
  plugins: plugins_default
});
export {
  hyperjs_default as default
};
