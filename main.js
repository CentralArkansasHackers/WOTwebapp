// Main application file for Electron-based Wheel of Time Security Practice App
const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// Create an Express server
const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Simulated vulnerable database
const database = [
    { id: 1, username: "Rand", password: "al'Thor" },
    { id: 2, username: "Mat", password: "Cauthon" },
    { id: 3, username: "Perrin", password: "Aybara" }
];

// Serve the main HTML file
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// SQL Injection Vulnerability Endpoint
server.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Vulnerable SQL query simulation
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    console.log("Executed Query:", query);

    const result = database.find(
        user => user.username === username && user.password === password
    );

    if (result) {
        res.send(`<h1>Login successful: Welcome, ${result.username}!</h1>`);
    } else if (query.includes("' OR '1'='1")) {
        res.send('<h1>SQL Injection Successful! Database compromised.</h1>');
    } else {
        res.send('<h1>Incorrect username or password.</h1>');
    }
});

// Cross-Site Scripting (XSS) Vulnerability Endpoint
server.post('/xss', (req, res) => {
    const userInput = req.body.input;
    res.send(`<h1>Rendered Input:</h1><div>${userInput}</div>`); // Intentionally vulnerable
});

// Cross-Site Request Forgery (CSRF) Simulation Endpoint
server.get('/csrf', (req, res) => {
    res.send('<h1>You just sent a forged request to the server! Imagine this being an unauthorized transaction.</h1>');
});

// Start the Express server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Vulnerable app running at http://localhost:${PORT}`);
});

// Create the Electron application
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(`http://localhost:${PORT}`);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        mainWindow = new BrowserWindow({
            width: 1200,
            height: 800,
            webPreferences: {
                nodeIntegration: true
            }
        });

        mainWindow.loadURL(`http://localhost:${PORT}`);
    }
});

