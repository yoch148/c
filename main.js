const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// מאפשר הרצה של מופע אחד בלבד
if (!app.requestSingleInstanceLock()) {
  app.quit();
}

// ===== שמירת נתונים בקובץ בתיקיית "מסמכים" =====
// C:\Users\<שם>\Documents\קופת היומי\נתונים.json
function dataDir() {
  return path.join(app.getPath('documents'), 'קופת היומי');
}
function dataFile() {
  return path.join(dataDir(), 'נתונים.json');
}

ipcMain.on('store:load', (e) => {
  try {
    e.returnValue = fs.existsSync(dataFile())
      ? fs.readFileSync(dataFile(), 'utf8')
      : null;
  } catch (err) {
    e.returnValue = null;
  }
});

ipcMain.on('store:save', (e, json) => {
  try {
    fs.mkdirSync(dataDir(), { recursive: true });
    const tmp = dataFile() + '.tmp';
    fs.writeFileSync(tmp, String(json), 'utf8');
    // גיבוי של הגרסה הקודמת
    if (fs.existsSync(dataFile())) {
      fs.copyFileSync(dataFile(), path.join(dataDir(), 'נתונים.גיבוי.json'));
    }
    fs.renameSync(tmp, dataFile());
    e.returnValue = true;
  } catch (err) {
    e.returnValue = false;
  }
});

ipcMain.on('store:path', (e) => {
  e.returnValue = dataFile();
});

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 520,
    height: 860,
    minWidth: 380,
    minHeight: 500,
    title: 'קופת היומי',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, 'app', 'index.html'));

  // קישורים חיצוניים נפתחים בדפדפן ולא בתוך האפליקציה
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => app.quit());
