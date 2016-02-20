# flow-package [![Version](https://img.shields.io/npm/v/flow-package.svg)](https://www.npmjs.com/package/flow-package) [![Downloads](https://img.shields.io/npm/dt/flow-package.svg)](https://www.npmjs.com/package/flow-package)

> :package: A collection of flow compatible npm packages.

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