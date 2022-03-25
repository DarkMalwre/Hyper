<br />

<div align="center">
  <img width="100" src="https://raw.githubusercontent.com/SkylixGH/Hyper/main/.github/workflows/HyperJS%20Logo.svg" alt="" />
</div>

<br />

<div align="center">
    <a href="./docs/README.md">Documentation</a>
    •
    <a target="_blank" href="https://discord.gg/b9vcR6evgG">Discord</a>
    •
    <a href="./docs/CONTRIBUTING.md">Contributing</a>
</div>

<h1 align="center">H Y P E R</h1>
<p align="center">The worlds first extensible full-stack NodeJS framework for building cross-platform apps, servers and more!</p>

## Installing
**Stable Release (Npm)**
```bash
# Install HyperJS's CLI service globaly
npm install -g @hyper-stack/cli

# Install HyperJS's CLI service in a project locally
npm install -g @hyper-stack/cli
```

**Nightly Release (Npm)**
```bash
# Install HyperJS's CLI service globaly
npm install -g @hyper-stack/cli@next

# Install HyperJS's CLI service in a project locally
npm install -g @hyper-stack/cli@next
```

**Github Direct (Shell Script)**
This script is coming soon!

## Building
To compile HyperJS's packages, you much ensure that [Git](https://git-scm.com/) and [NodeJS](https://nodejs.org/) are installed on your system.

**Clone HyperJS**
```bash
git clone https://github.com/SkylixGH/Hyper.git
```

**Install Dependencies**
```bash
cd Hyper
npm install
```

**Start Development Service**
```bash
npm run d:watch
```

**Install CLI Service**
**NOTE**: Keep the development service and open a new terminal instance and `cd` into the root of HyperJS to run this command.

```bash
npm run d:cli-reinstall-global
```

## Usage
**Production Mode**
```bash
# If you installed HyperJS globally
hyperjs <arguments>

# If you installed HyperJS locally
npx hyperjs <arguments>
```

**Debug Mode**
```bash
# If you installed HyperJS globally
hyperjs-debug <arguments>

# If you installed HyperJS locally
npx hyperjs-debug <arguments>
```

## License
This project is being developed and is maintained by [Skylix](https://github.com/SkylixGH).
<br />
This project is licensed under the [MIT License](./LICENSE).

[//]: # (TODO: Fork `chalk` module and make it support CJS/ESM, fork it to `skylixgh/chalk`)
[//]: # (TODO: Add external prop to jsts plugin)
