# electron-ipc-typed

Type-safe IPC utilities for Electron applications.

## Features

- **Type-safe IPC communication** between main and renderer processes
- **Full TypeScript support** with automatic type inference
- **Simple API** - no boilerplate code required

## Installation

```bash
npm install electron-ipc-typed
```

## Usage

### 1. Define IPC Types

Create a shared types file:

```typescript
// ipc-type.ts
import type { IpcType } from 'electron-ipc-typed'

export interface MyIpcType extends IpcType<'app'> {
  handle: {
    'app:get-version': () => Promise<string>
    'app:get-config': (key: string) => Promise<any>
  }
  on: {
    'app:update-available': (version: string) => void
  }
  emit: {
    'app:state-change': [state: string, timestamp: number]
  }
}
```

### 2. Main Process

```typescript
// main process
import { createIpc } from 'electron-ipc-typed'
import type { MyIpcType } from './ipc-type'

const ipc = createIpc<MyIpcType>()

// Register handle - renderer calls invoke()
ipc.handle('app:get-version', () => {
  return '1.0.0'
})

// Listen for events from renderer
ipc.on('app:update-available', (_, version) => {
  console.log('Update available:', version)
})

// Send events to renderer
ipc.emit(webContents, 'app:state-change', 'running', Date.now())
```

### 3. Preload Script

```typescript
// preload.ts
import { injectIPCBridge } from 'electron-ipc-typed/preload'

injectIPCBridge()
```

### 4. Renderer Process

```typescript
// renderer process
import { useIpcClient } from 'electron-ipc-typed/renderer'
import type { MyIpcType } from './ipc-type'

const client = useIpcClient<MyIpcType>()

// Call main process handlers
const version = await client.invoke('app:get-version')

// Listen for events from main process
const off = client.on('app:state-change', (_, state, timestamp) => {
  console.log('State changed:', state, timestamp)
})

// Send events to main process
client.emit('app:update-available', '2.0.0')

off()
```

## Example

Get working example from [electron-ipc-example](https://github.com/yscoder/electron-ipc-typed/blob/main/packages/example/).

## API

### Main Process

#### `createIpc<T>()`

Creates an IPC handler for the main process.

- `handle(channel, handler)` - Register a handler for `invoke()` calls
- `on(channel, listener)` - Listen for `emit()` events from renderer
- `emit(webContents, channel, ...args)` - Send events to renderer

### Renderer Process

#### `useIpcClient<T>()`

Creates an IPC client for the renderer process.

- `invoke(channel, ...args)` - Call a main process handler (returns Promise)
- `on(channel, callback)` - Listen for events from main process (returns unsubscribe function)
- `once(channel, callback)` - Listen for event once
- `emit(channel, ...args)` - Send events to main process

### Preload

#### `injectIPCBridge()`

Exposes the IPC bridge to the renderer process via `window.$ElectronBridge`.

## Repository

[GitHub](https://github.com/yscoder/electron-ipc-typed)

## License

MIT
