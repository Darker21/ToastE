const path = require('path');

class Globals {
    static get rootDir() { return path.join(path.resolve(__dirname), '..', '..', '..'); }
    static get e2eDir() { return `${Globals.rootDir}/tests/e2e`; }
}

module.exports = { Globals };