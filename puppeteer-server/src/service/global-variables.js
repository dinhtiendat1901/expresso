let listCurrentBrowser = []
let listRunStatus = []
let scriptData = { currentScriptId: '' }; // Encapsulate the script ID in an object

function setListCurrentBrowser(listBrowserUpdated) {
    listCurrentBrowser.length = 0;  // Clear the array without changing the reference
    listBrowserUpdated.forEach(item => listCurrentBrowser.push(item));  // Add new items
}

function setListRunStatus(listRunStatusUpdated) {
    listRunStatus.length = 0;  // Clear the array without changing the reference
    listRunStatusUpdated.forEach(item => listRunStatus.push(item));  // Add new items
}

function setCurrentScriptId(newCurrentScriptId) {
    scriptData.currentScriptId = newCurrentScriptId; // Update the property of the object
}

module.exports = {
    listCurrentBrowser,
    setListCurrentBrowser,
    setListRunStatus,
    listRunStatus,
    scriptData, // Export the object
    setCurrentScriptId
};
