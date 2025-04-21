const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Set up file storage with multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Serve static files (CSS and JS)
app.use(express.static('public'));

// Serve uploaded files
app.use('/files', express.static('uploads'));

// Upload file endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        res.status(200).send('File uploaded successfully!');
    } else {
        res.status(400).send('No file uploaded.');
    }
});

// Endpoint to get the list of files
app.get('/files', (req, res) => {
    const fs = require('fs');
    const uploadsDir = 'uploads/';
    
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            res.status(500).send('Unable to list files.');
            return;
        }
        res.json(files);
    });
});

// Serve the index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
