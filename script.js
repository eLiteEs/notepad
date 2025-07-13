let files = JSON.parse(localStorage.getItem('files') || '[]');
let filename = "No Name";
let zoomLevel = 1;

function updateFilename() {
    document.getElementById("filename").innerText = "Document: " + filename;
}

function saveFile(name, content) {
    const index = files.findIndex(f => f.name === name);
    if (index !== -1) files[index].content = content;
    else files.push({ name, content });

    localStorage.setItem('files', JSON.stringify(files));
}

function updateZoom() {
    document.getElementById("editor").style.transform = `scale(${zoomLevel})`;
    document.getElementById("editor").style.transformOrigin = "top left";
}

document.getElementById('saveBtn').addEventListener('click', () => {
    const text = document.getElementById("editor").innerText;

    if (filename === "No Name") {
        const newName = prompt("Please enter a filename:", "New File");
        if (!newName) return alert("Filename cannot be empty.");
        filename = newName;
    }

    saveFile(filename, text);
    updateFilename();
    alert("File saved.");
});

document.getElementById('saveAsBtn').addEventListener('click', () => {
    const text = document.getElementById("editor").innerText;
    const newName = prompt("Save as:", filename);
    if (!newName) return alert("Filename cannot be empty.");

    filename = newName;
    saveFile(filename, text);
    updateFilename();
    alert("File saved as.");
});

document.getElementById('openBtn').addEventListener('click', () => {
    const name = prompt("Enter filename to load:");
    if (!name) return alert("Filename cannot be empty.");

    const file = files.find(f => f.name === name);
    if (!file) return alert("File not found.");

    document.getElementById("editor").innerText = file.content;
    filename = file.name;
    updateFilename();
    alert("File loaded.");
});

document.getElementById('zoomInBtn').addEventListener('click', () => {
    zoomLevel += 0.1;
    updateZoom();
});

document.getElementById('zoomOutBtn').addEventListener('click', () => {
    zoomLevel = Math.max(0.1, zoomLevel - 0.1);
    updateZoom();
});
