import { contextBridge, ipcRenderer } from 'electron'

type OffFunction = () => void

export const IPCBridge = {
    exec: (type: string, ...payload: any) => ipcRenderer.invoke(type, ...payload),
    on: (type: string, callback: (...args: any[]) => void): OffFunction => {
        ipcRenderer.on(type, callback)
        return () => {
            ipcRenderer.off(type, callback)
        }
    },
    once: (type: string, callback: (...args: any[]) => void) => {
        ipcRenderer.once(type, callback)
    },
    off: (type: string) => {
        ipcRenderer.removeAllListeners(type)
    },
    send: (type: string, ...payload: any[]) => {
        ipcRenderer.send(type, ...payload)
    }
}

export type IPCBridge = typeof IPCBridge

export function injectIPCBridge() {
    contextBridge.exposeInMainWorld('$ElectronBridge', IPCBridge)
}
