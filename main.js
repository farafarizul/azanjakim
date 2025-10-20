const { app, BrowserWindow, Menu, ipcMain, Tray } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const appName = "Azan JAKIM";  // Define your app name here

let mainWindow;
let tray;

// Function to create the main window
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, 'images/icons/main-logo.png') // Set the window icon
    });

    mainWindow.loadFile('index.html');

    // Prevent the window from closing when the close button is clicked
    mainWindow.on('close', (event) => {
        event.preventDefault();
        mainWindow.hide(); // Hide the window instead of closing
    });

    // Open DevTools if in development
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => {
        if(!app.isQuiting && settings.systray){
            event.preventDefault();
            mainWindow.hide();
            return false;
        }
        else{
            app.isQuiting = true;
            app.quit();
            return true;
        }
    });
}

app.on('before-quit', function () {
    app.isQuiting = true;
});

// Function to create the tray icon and menu
function createTray() {
    tray = new Tray('images/icons/main-logo.png');
    tray.setToolTip(appName);

    const trayMenu = Menu.buildFromTemplate([
        {
            label: 'Open App',
            click: () => {
                mainWindow.show();
            }
        },
        {
            label: 'Exit',
            click: () => {
                app.quit(); // Quit the app when clicked
            }
        }
    ]);

    tray.setContextMenu(trayMenu);
    tray.setToolTip(appName);

    // Show window when clicked on tray icon
    tray.on('click', () => {
        mainWindow.show();
    });
}

// Create application menu
const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'About',
                click() {
                    createAboutWindow();
                }
            },
            {
                label: 'Settings',
                click() {
                    createSettingsWindow();
                }
            },
            {
                label: 'Close to tray',
                click() {
                    mainWindow.hide();
                },
                role: 'quit'
            }
        ]
    }
];

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

// Function to create About window
function createAboutWindow() {
    const aboutWindow = new BrowserWindow({
        width: 400,
        height: 300,
        title: "About",
        parent: mainWindow,
        modal: true,
        resizable: false, // Disable resizing
        maximizable: false, // Disable maximization
        minimizable: false, // Disable minimization
        closeable: true // Allow closing
    });



    aboutWindow.loadFile('about.html');

    aboutWindow.setMenu(null); // Remove menu from About window
}

// Function to create Settings window
function createSettingsWindow() {
    const settingsWindow = new BrowserWindow({
        width: 400,
        height: 300,
        title: "Settings",
        parent: mainWindow,
        modal: true
    });

    settingsWindow.loadFile('settings.html');

    settingsWindow.setMenu(null); // Remove menu from Settings window
}


// Run automatic startup logic
//const { app } = require('electron');
const userDataPath = app.getPath('userData');

const AutoLaunch = require('auto-launch');
const autoStart = new AutoLaunch({
    name: appName,
    isHidden: true
});

ipcMain.on('toggle-startup', (event, arg) => {
    if (arg) {
        autoStart.enable();
    } else {
        autoStart.disable();
    }
});

// Handle app ready
app.whenReady().then(() => {
    createWindow();
    createTray();

    // Check if auto-start is enabled, and enable/disable accordingly
    autoStart.isEnabled().then((enabled) => {
        console.log('Auto start is ' + (enabled ? 'enabled' : 'disabled'));
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Handle window-all-closed (exit when all windows are closed)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
