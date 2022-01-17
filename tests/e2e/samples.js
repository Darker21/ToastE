const { cluster } = require('cluster');
const path = require('path');
const { Cluster } = require('puppeteer-cluster');
const { TestUtils } = require('./utils/utils');

const rootDir = path.join(path.resolve(__dirname), '..', '..');

const { builds } = require('../../build/config');

const e2eDir = `${rootDir}/tests/e2e`;

let browser;

class TestError extends Error {
    constructor(message) {
        super(message);
        this.hideStack = true;
    }
}

async function processSamples(command, paths) {
    const startTime = Date.now();

    await TestUtils.updateBundle[builds['web-umd-dev']];

    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_PAGE,
        maxConcurrency: 5
    });

    await cluster.task(async ({ page, data: sample }) => {
        process.stdout.write("\r\n\r\nBedtime...\r\n");
        process.stdout.write("Good Morning!");
    });

    for (var i = 0; i < 10; i++) {
        cluster.queue(i);
    }

    await cluster.idle();
    await cluster.close();
}

// Run as 'node samples.js <command> <path1> <path2> ...'
// Supports two commands:
// - 'test' for running e2e tests
// - 'update' for updating samples screenshots used for e2e tests comparison
// Path options have the format 'bar/basic-bar'. Paths are optional for 'test' command.
// For 'update' command 'all' path can be used to update all screenshots.
const command = process.argv[2];
if (['update', 'test'].includes(command)) {
    processSamples(command, process.argv.slice(3))
        .catch((e) => console.log(e))
        .then(() => {
            if (browser) {
                return browser.close();
            }
        });
}