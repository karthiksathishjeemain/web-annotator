// popup.js
document.getElementById('save-annotation').addEventListener('click', () => {
    const annotation = document.getElementById('annotation-text').value;
    const color = document.getElementById('color-button').value;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "annotate", text: annotation, color: color});
    });
});

// document.getElementById('download-pdf').addEventListener('click', () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         chrome.tabs.sendMessage(tabs[0].id, { action: "downloadPDF" });
//     });
// });

    document.getElementById('edit-annotation').addEventListener('click', () => {
        window.open('new-page.html', '_blank');
    });

