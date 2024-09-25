import {BrowserContext, chromium} from "playwright";
import {io} from '../socket';
import {listCurrentBrowser} from "./global-variables";
import _ from 'lodash';

async function runProfile(id: string, path: string) {
    const browser: BrowserContext = await chromium.launchPersistentContext(path, {
        headless: false,
        viewport: null,
        args: [
            '--disable-blink-features=AutomationControlled'
        ],
    });

    browser.on('close', () => {
        io.emit('close-profile', id);
        _.remove(listCurrentBrowser, item => item.id === id);
    });

    listCurrentBrowser.push({
        id,
        browser
    })
}

async function stopProfile(id: string) {
    const browser = listCurrentBrowser.find(browserIndex => browserIndex.id === id)?.browser;
    if (browser) {
        await browser.close();
    }
}


export {runProfile, stopProfile}