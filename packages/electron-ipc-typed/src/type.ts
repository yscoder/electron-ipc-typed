import './global'

export type IpcChannelType<T extends string> = `${T}:${string}`
export type IpcHandleType<T extends string> = {
    [K in IpcChannelType<T>]: (...args: any[]) => Promise<any>
}
export type IpcOnType<T extends string> = Record<IpcChannelType<T>, (...args: any[]) => void>
export type IpcEmitType<T extends string> = Record<IpcChannelType<T>, any[]>
export type IpcType<T extends string> = {
    handle?: IpcHandleType<T>,
    on?: IpcOnType<T>
    emit?: IpcEmitType<T>
}
export type ExtractIpcHandleValue<T, K extends keyof T> = T extends IpcHandleType<IpcChannelType<string>> ? T[K] : never
export type ExtractIpcOnValue<T, K extends keyof T> = T extends IpcOnType<IpcChannelType<string>> ? T[K] : never
