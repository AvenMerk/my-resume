
// Select color input
//let colorPicker = document.getElementById('colorPicker');
//let clr = colorPicker.getAttribute('color');
// Select size input
// When size is submitted by the user, call makeGrid()

let btn = document.getElementById('btn');
btn.addEventListener('click', makeGrid);  //

// function for creating a table
function makeGrid() {
    let inputWeight = document.getElementById("inputWeight").value; //size of the table
    let inputHeight = document.getElementById("inputHeight").value;
    const table = document.getElementById('pixelCanvas');
    for (let i = 0; i < inputHeight; i++) {
        const tab = table.insertRow(i);
        for (let j = 0; j < inputWeight; j++) {
            const cell = tab.insertCell(j);
            cell.addEventListener('click', function(evt) {
                evt.target.style.backgroundColor = document.getElementById('colorPicker').value;
            });
        }
    }

    let butn = document.createElement("button");        // Create a <button> element
    let t = document.createTextNode("Refresh");       // Create a text node
    butn.appendChild(t);                                // Append the text to <button>
    document.body.appendChild(butn);
    butn.setAttribute('style', 'margin-top: 1em');
    function refresh() {
        return location.reload();
    }
    butn.addEventListener('click', refresh);
}

