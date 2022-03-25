// hyperjs.ts
import { config } from "@hyper-stack/cli";

// plugins.ts
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
    await this.checkOtherRenderers();
  }
};
var plugins = [
  new MyPlugins()
];
var plugins_default = plugins;

// hyperjs.ts
var hyperjs_default = config({
  plugins: plugins_default
});
export {
  hyperjs_default as default
};
