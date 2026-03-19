import { ipcMain, app, BrowserWindow } from "electron";
import path from "path";
function i() {
  return {
    handle(n, e) {
      ipcMain.handle(n, e);
    },
    on(n, e) {
      ipcMain.on(n, e);
    },
    emit(n, e, ...r) {
      n.send(e, ...r);
    }
  };
}
const ipc = i();
ipc.handle("test:get-version", async (e) => {
  emitStateChange(e.sender);
  return process.versions.electron;
});
ipc.handle("test:get-config", async (_, key) => {
  return { theme: "dark", lang: "zh-CN" }[key];
});
let state = 0;
function emitStateChange(webContents) {
  ipc.emit(webContents, "test:state-change", state++, Date.now());
  if (state > 100) return;
  setTimeout(() => {
    emitStateChange(webContents);
  }, 1e3);
}
const dirname = import.meta.dirname;
app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(dirname, "preload.mjs")
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(path.join(process.env.VITE_DEV_SERVER_URL, "index.html"));
  } else {
    win.loadFile(path.join(dirname, `../dist/index.html`));
  }
  win.webContents.openDevTools();
});
app.on("window-all-closed", () => {
  app.quit();
});
