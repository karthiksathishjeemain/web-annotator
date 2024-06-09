// document.getElementById('annotated-word').textContent = annotatedWord;
// document.getElementById('annotation-text').textContent = annotationText;
// chrome.storage.local.get(['annotatedWord', 'annotationText'], function(result) {
//     document.getElementById('annotated-word').textContent = result.annotatedWord;
//     document.getElementById('annotation-text').textContent = result.annotationText;
// });
chrome.storage.local.get('annotations', function(result) {
    var annotations = result.annotations || [];

    // Get the table
    
    // var table = document.querySelector('table')
    
var table = document.getElementById('annotations-table');

// Hide the table if there are no annotations
if (annotations.length === 0) {
    table.style.display = 'none';
} else {
    table.style.display = 'table'; // Or whatever the original display value was
}
    // Create a new row for each annotation
    annotations.forEach(function(annotation) {
        var row = table.insertRow();

        var cell1 = row.insertCell();
        cell1.textContent = annotation.word;

        var cell2 = row.insertCell();
        cell2.textContent = annotation.text;
        var cell3=row.insertCell();
        // var deleteButton = document.createElement('button');  
        var deleteButton = document.createElement('button');
        // deleteButton.style.backgroundColor = 'red';
         
        deleteButton.textContent = 'Delete';
        cell3.appendChild(deleteButton);
        deleteButton.addEventListener('click', function() {
            // Find the index of the annotation
            var index = annotations.findIndex(a => a.word === annotation.word);
            annotations.splice(index, 1);
             
            // Update the storage
            chrome.storage.local.set({annotations: annotations});
            chrome.runtime.sendMessage({action: "removeHighlight", word: annotation.word});
             
            // Remove the row from the table
            table.deleteRow(row.rowIndex);
            
        });
    });
});