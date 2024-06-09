// import { jsPDF } from "jspdf";
// }
// const { jsPDF } = require("jspdf");
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "annotate") {
        var annotationText = request.text;
        var color= request.color;
        const range = window.getSelection().getRangeAt(0);
        var annotatedWord = range.toString().trim();
        const span = document.createElement('span');
        // span.className = 'highlight';
        span.title = annotationText;
        span.style.backgroundColor = color;
        range.surroundContents(span);
        span.addEventListener('click', function() {
            var popup = document.createElement('div');
            popup.id = 'annotation-popup';
            popup.textContent = annotationText;
            document.body.appendChild(popup);
            popup.style.left = (window.innerWidth / 2) - (popup.offsetWidth / 2) + 'px'; // center horizontally
            popup.style.top = (window.innerHeight / 2) - (popup.offsetHeight / 2) + 'px'; // center vertically
        });
        
        
        chrome.storage.local.get('annotations', function(result) {
            var annotations = result.annotations || [];

            // Append the new annotation
            annotations.push({word: annotatedWord, text: annotationText});

            // Store the updated annotations
            chrome.storage.local.set({annotations: annotations});
        });
       
    }
//     else if (request.action === "downloadPDF") {
//         console.log("Downloading PDF");
//         chrome.storage.local.get('annotations', function(result) {
//             var annotations = result.annotations || [];

//         generatePDF(annotations);
//     })

// }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "highlightSelectedText") {
        highlightSelectedText();
    }
});
function highlightSelectedText() {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
        const range = window.getSelection().getRangeAt(0);
        const span = document.createElement('span');
        span.className = 'highlight2';
        span.title = "Highlighted Text";
        range.surroundContents(span);

        // annotations.push({
        //     text: range.toString(),
        //     annotation: "Highlighted Text",
        //     pageTitle: document.title,
        //     pageURL: window.location.href
        // });

        window.getSelection().removeAllRanges(); // Deselect the text
    }
}
// chrome.runtime.onMessage.addListener((request,sender,senderResponse)=>{
//     if (request.action === "downloadPDF") {
//         console.log("Downloading PDF");
//         chrome.storage.local.get('annotations', function(result) {
//             var annotations = result.annotations || [];

//         generatePDF(annotations);
//     })

// }
// })
// function loadJsPDF(callback) {
//     const script = document.createElement('script');
//     script.src = chrome.runtime.getURL('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
//     script.onload = callback;
//     document.head.appendChild(script);
// }

// Function to generate PDF after jsPDF is loaded
// function generatePDF(annotations) {
//     if (typeof jsPDF === 'undefined') {
//         console.log("Creating PDF if");
//         loadJsPDF(() => {
//             createPDF(annotations);
//         });
//     } else {
//         console.log("Creating PDF else");
//         createPDF(annotations);
//     }
// }
  
// function createPDF(annotations) {
    
   
//     // const { jsPDF } = window.jspdf;
//     const doc = new jsPDF();

//     doc.setFontSize(16);
//     doc.text('Web Annotations', 10, 10);
//     doc.setFontSize(12);
    
//     annotations.forEach((annotation, index) => {
//         doc.text(`Annotation ${index + 1}:`, 10, 20 + (index * 30));
//         doc.text(`Text: ${annotation.text}`, 10, 30 + (index * 30));
//         doc.text(`Note: ${annotation.annotation}`, 10, 40 + (index * 30));
//         // doc.text(`Page Title: ${annotation.pageTitle}`, 10, 50 + (index * 30));
//         // doc.text(`Page URL: ${annotation.pageURL}`, 10, 60 + (index * 30));
//     });

//     doc.save('annotations.pdf');
// }
