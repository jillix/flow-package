# flow-packages [![Version](https://img.shields.io/npm/v/flow-packages.svg)](https://www.npmjs.com/package/flow-packages) [![Downloads](https://img.shields.io/npm/dt/flow-packages.svg)](https://www.npmjs.com/package/flow-packages)

> :package: A collection of flow compatible npm packages.

## Example

```js
const packages = require("flow-packages");

console.log(packages);
// [ { name: 'flow-app',
//     version: '0.1.0-beta',
//     private: true,
//     author: { name: 'jillix', email: 'contact@jillix.com' },
//     ...
//     _id: 'flow-app@0.1.0-beta' },
//   { name: 'flow-pack',
//     version: '0.0.1',
//     description: 'Bundle npm modules of a flow app.',
//     main: 'index.js',
//     bin: { 'flow-pack': 'bin/index.js' },
//     scripts: { test: 'echo "Error: no test specified" && exit 1' },
//     ...
//     _id: 'flow-pack@0.0.1' },
//   { name: 'view',
//     version: '0.1.0',
//     description: 'Render HTML templates',
//     repository: { type: 'git', url: 'git://github.com/adioo/view.git' },
//     ...
//     _id: 'view@0.1.0' },
//   ...
//   { name: 'engine-data-alter',
//     version: '1.0.0',
//     description: 'Alter engine data',
//     ...
//     _id: 'engine-data-alter@1.0.0' } ]
```

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

### Adding a new module

 1. Add the module git url (if it's hosted on GitHub, you can use the `owner/repo` format) in the [`build/packages.json`](/build/packages.json).
 2. Run `npm i` to install the dev dependencies (if you don't have Node.js installed on your machine, just skip this step and the next one).
 3. Rebuild the packages list by running `npm run refresh`
 4. Commit the things and create a pull request (check the [`CONTRIBUTING.md`](/CONTRIBUTING.md) for details).

## License

[ISC][license] © [][website]

[license]: http://showalicense.com/?fullname=&year=2016#license-isc
[website]: 
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md