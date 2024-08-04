const puppeteer = require('puppeteer-extra');
puppeteer.use(require('puppeteer-extra-plugin-stealth')());
const {io} = require('../socket');
const {listCurrentBrowser, setListCurrentBrowser, setCurrentScriptId} = require('./global-variables');
const {myQueue, setFunctionJob, clearQueue} = require("./bullmq-init");


async function runProfile(id, path) {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        userDataDir: path
    });

    browser.on('disconnected', () => {
        io.emit('close-profile', id);
        setListCurrentBrowser(listCurrentBrowser.filter(browserIndex => browserIndex.id !== id));
    });

    listCurrentBrowser.push({
        id,
        browser
    });
}

async function stopProfile(id) {
    const browser = listCurrentBrowser.find(browserIndex => browserIndex.id === id)?.browser;
    if (browser) {
        await browser.close();
    }
}

async function runJob(script, listRunProfiles) {
    await clearQueue();
    setFunctionJob(script.path);
    setCurrentScriptId(script.id);
    await myQueue.addBulk(listRunProfiles.map(profile => {
        return {
            name: 'job',
            data: {
                id: profile.id,
                path: profile.path
            }
        }
    }))
}

module.exports = {runProfile, stopProfile, runJob};
