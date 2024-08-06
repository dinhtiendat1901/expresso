const path = require("path");
const fs = require("fs");
let listCurrentBrowser = []
let listRunStatus = []
let functionJob = {
    job: null
}

function setListCurrentBrowser(listBrowserUpdated) {
    listCurrentBrowser.length = 0;  // Clear the array without changing the reference
    listBrowserUpdated.forEach(item => listCurrentBrowser.push(item));  // Add new items
}

function setListRunStatus(listRunStatusUpdated) {
    listRunStatus.length = 0;  // Clear the array without changing the reference
    listRunStatusUpdated.forEach(item => listRunStatus.push(item));  // Add new items
}

function createJob(pathStr) {
    const filePath = path.join(pathStr);
    const content = fs.readFileSync(filePath, 'utf8');
    functionJob.job = eval(`
        async function test(browser) {
            ${content}
        }

        test;
    `)
}

module.exports = {
    listCurrentBrowser,
    setListCurrentBrowser,
    setListRunStatus,
    listRunStatus,
    functionJob,
    createJob
};
