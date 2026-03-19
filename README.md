# electron-ipc-typed

A monorepo workspace for developing and testing the `electron-ipc-typed` library.

## Packages

| Package | Description |
|---------|-------------|
| [electron-ipc-typed](./packages/electron-ipc-typed/) | Type-safe IPC utilities for Electron |
| [example](./packages/example/) | Example Electron app using the library |

## Development

```bash
# Install dependencies (from workspace root)
npm install

# Build the library
cd packages/electron-ipc-typed
npm run build

# Run the example
cd packages/example
npm run dev
```

## Structure

```
packages/
├── electron-ipc-typed/   # The library source
│   ├── src/
│   │   ├── main.ts       # Main process IPC utilities
│   │   ├── preload.ts    # Preload script bridge
│   │   ├── renderer.ts   # Renderer process client
│   │   └── type.ts       # TypeScript type definitions
│   └── dist/             # Built output
└── example/              # Example Electron application
    ├── src/              # Source files
    │   ├── main/         # Main process entry
    │   ├── renderer/     # Renderer process entry
    │   └── preload.ts    # Preload script
    └── dist-electron/    # Built electron files
```
