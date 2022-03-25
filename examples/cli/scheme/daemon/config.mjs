// hyperjs.ts
import { config } from "@hyper-stack/cli";

// plugins.ts
import CLIPluginJSTS from "@hyper-stack/cli-plugin-jsts";
import CLIPluginDTS from "@hyper-stack/cli-plugin-dts";
import CLIPluginHTML from "@hyper-stack/cli-plugin-html";
import { HyperPlugin } from "@hyper-stack/cli";
import Terminal from "@hyper-stack/terminal";
var MyPlugins = class extends HyperPlugin {
  async checkOtherRenderers() {
    Terminal.log("Checking other renderers...");
  }
  constructor() {
    super("uwudude");
  }
  async initialize(client) {
    Terminal.log(client);
    Terminal.log(client.loadedPlugins);
    await this.checkOtherRenderers();
  }
};
var plugins = [
  new MyPlugins(),
  new CLIPluginDTS(),
  new CLIPluginJSTS(),
  new CLIPluginHTML({
    log: true
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
