const fs = require('fs');
const path = require('path');

function createJob(pathStr) {
    const filePath = path.join(pathStr);
    const content = fs.readFileSync(filePath, 'utf8');
    return eval(`
        async function test(browser) {
            ${content}
        }

        test;
    `)
}

module.exports = {createJob};
