import {BrowserContext} from "playwright";

interface CurrentBrowser {
    id: string,
    browser: BrowserContext
}

let listCurrentBrowser: CurrentBrowser[] = [];

export {
    listCurrentBrowser
}