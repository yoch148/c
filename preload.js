const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('kupatStore', {
  load: () => ipcRenderer.sendSync('store:load'),
  save: (json) => ipcRenderer.sendSync('store:save', json),
  path: () => ipcRenderer.sendSync('store:path')
});
