// /Users/XFaon/CLionProjects/Hyper/examples/cli/hyperjs.ts
import { config } from "@hyper-stack/cli";

// /Users/XFaon/CLionProjects/Hyper/examples/cli/plugins.ts
import CLIPluginJSTS from "@hyper-stack/cli-plugin-jsts";
import CLIPluginDTS from "@hyper-stack/cli-plugin-dts";
import CLIPluginHTML from "@hyper-stack/cli-plugin-html";
var plugins = [
  new CLIPluginDTS(),
  new CLIPluginJSTS(),
  new CLIPluginHTML({
    log: true
  })
];
var plugins_default = plugins;

// /Users/XFaon/CLionProjects/Hyper/examples/cli/hyperjs.ts
var hyperjs_default = config({
  plugins: plugins_default
});
export {
  hyperjs_default as default
};
