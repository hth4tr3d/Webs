// Form submission for file upload
document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData();
    const fileInput = document.getElementById('fileInput');
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('File uploaded successfully!');
            loadFiles(); // Refresh the file list
        } else {
            alert('Failed to upload file.');
        }
    } catch (error) {
        console.error('Error uploading file:', error);
    }
});

// Load available files for download
async function loadFiles() {
    try {
        const response = await fetch('/files');
        const files = await response.json();
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = ''; // Clear existing list

        files.forEach(file => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="/files/${file}" download>${file}</a>`;
            fileList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error loading file list:', error);
    }
}

// Load the files when the page is loaded
window.onload = loadFiles;
