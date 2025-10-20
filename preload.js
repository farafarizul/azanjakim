const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    toggleAutoStart: (value) => ipcRenderer.send('toggle-startup', value),
    getAutoStartStatus: () => ipcRenderer.invoke('get-startup-status'),
    readJson: (filePath) => ipcRenderer.invoke('read-json', filePath),
});
