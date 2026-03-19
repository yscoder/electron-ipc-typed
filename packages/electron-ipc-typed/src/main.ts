import { ipcMain, IpcMainEvent, IpcMainInvokeEvent, WebContents } from 'electron'
import { ExtractIpcHandleValue, ExtractIpcOnValue, IpcChannelType, IpcType } from './type'

export function createIpc<T extends IpcType<IpcChannelType<string>>>() {
    return {
        handle<K extends keyof T['handle']>(channel: Extract<K, IpcChannelType<string>>, handler: (e: IpcMainInvokeEvent, ...args: Parameters<ExtractIpcHandleValue<T['handle'], K>>) => ReturnType<ExtractIpcHandleValue<T['handle'], K>>) {
            ipcMain.handle(channel, handler)
        },
        on<K extends keyof T['on']>(channel: Extract<K, IpcChannelType<string>>, listener: (e: IpcMainEvent, ...args: Parameters<ExtractIpcOnValue<T['on'], K>>) => void) {
            ipcMain.on(channel, listener)
        },
        emit<K extends keyof T['emit']>(sender: WebContents, channel: Extract<K, IpcChannelType<string>>, ...args: Extract<T['emit'][K], any[]>) {
            sender.send(channel, ...args)
        }
    }
}

export type { IpcType }
