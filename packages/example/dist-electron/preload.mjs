"use strict";
const electron = require("electron");
const i = {
  exec: (e, ...n) => electron.ipcRenderer.invoke(e, ...n),
  on: (e, n) => (electron.ipcRenderer.on(e, n), () => {
    electron.ipcRenderer.off(e, n);
  }),
  once: (e, n) => {
    electron.ipcRenderer.once(e, n);
  },
  off: (e) => {
    electron.ipcRenderer.removeAllListeners(e);
  },
  send: (e, ...n) => {
    electron.ipcRenderer.send(e, ...n);
  }
};
function d() {
  electron.contextBridge.exposeInMainWorld("$ElectronBridge", i);
}
d();
