// background.js
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "showPopup") {
//         chrome.action.openPopup();
//     }
// });
chrome.commands.onCommand.addListener((command) => {
    if (command === "highlight-text") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "highlightSelectedText" });
        });
    }
    else if (command === "open-popup") {
        chrome.windows.create({
            url: chrome.runtime.getURL("popup_page.html"),
            type: "popup",
            width: 400,
            height: 400
        });
    }
});