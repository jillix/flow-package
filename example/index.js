const packages = require("../lib");

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
