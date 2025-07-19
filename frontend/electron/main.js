// /electron/main.js
const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 390,
    height: 744,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Option 1: Load from local dev server (good for development)
  win.loadURL("http://localhost:3000");

  // Option 2: Load static export (good for production)
  // win.loadFile(path.join(__dirname, '../out/index.html'));
}

app.whenReady().then(() => {
  createWindow();
});
