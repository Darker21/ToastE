const Globals = require('./globals');
const fs = require('fs-extra');
const { executeBuildEntry } = require('../../../build/config');

class TestUtils {
    static dirLastModified(dir) {
        let time = 0;
        fs.readdirSync(dir).forEach((f) => {
            const itemPath = path.join(dir, f);
            const stat = fs.statSync(itemPath);
            const timeModified = stat.isDirectory()
                ? dirLastModified(itemPath)
                : stat.mtime;
            time = Math.max(time, timeModified);
        });
        return time;
    }

    static async updateBundle(config) {
        const timeModified = fs.existsSync(config.dest)
            ? fs.statSync(config.dest).mtime.valueOf()
            : 0;

        let codeModifiedTime = Math.max(
            dirLastModified(`${Globals.rootDir}/build`),
            dirLastModified(`${Globals.rootDir}/src`)
        );

        if (timeModified < codeModifiedTime) {
            await executeBuildEntry(config);
        }
    }
}

module.exports = { TestUtils };