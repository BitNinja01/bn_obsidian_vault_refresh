# Vault Refresh

An Obsidian plugin that allows you to refresh your vault's file explorer without restarting Obsidian. Perfect for when you add files or folders to your vault through the file system and want them to appear immediately.

## Features

- 🔄 **One-click vault refresh** - Refresh the file explorer with a single click
- 🎯 **Ribbon button** - Quick access from the left sidebar
- ⌨️ **Command palette** - Execute via "Refresh Vault" command
- ⚡ **Fast & lightweight** - Minimal performance impact
- 🔒 **Safe** - Non-destructive, read-only operation

## Installation

### From Source

1. **Clone this repository**
   ```bash
   git clone https://github.com/BitNinja01/bn_obsidian_vault_refresh.git
   cd bn_obsidian_vault_refresh
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the plugin**
   ```bash
   npm run build
   ```

4. **Copy to your vault**

   Create the plugin folder in your vault:
   ```bash
   mkdir -p /path/to/your/vault/.obsidian/plugins/bn-obsidian-vault-refresh
   ```

   Copy the required files:
   ```bash
   cp main.js manifest.json /path/to/your/vault/.obsidian/plugins/bn-obsidian-vault-refresh/
   ```

5. **Enable the plugin**
   - Open Obsidian
   - Go to Settings → Community plugins
   - Disable Safe mode (if needed)
   - Find "Vault Refresh" in the list
   - Toggle it on

## Usage

### Using the Ribbon Button
Click the refresh icon (🔄) in the left sidebar to refresh your vault.

### Using the Command Palette
1. Press `Ctrl/Cmd + P` to open the command palette
2. Type "Refresh Vault"
3. Press Enter

## Development

### Building for Development

```bash
# Install dependencies
npm install

# Run development build (watches for changes)
npm run dev
```

### Project Structure

```
bn_obsidian_vault_refresh/
├── src/
│   ├── main.ts                 # Plugin entry point
│   └── commands/
│       └── refreshVault.ts     # Refresh logic
├── manifest.json               # Plugin metadata
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
└── esbuild.config.mjs         # Build configuration
```

### Technical Details

The plugin uses Obsidian's internal file system adapter APIs to reconcile the vault's file index:
- `adapter.reconcileFolderCreation()` - Syncs folder structure
- `adapter.reconcileFile()` - Syncs individual files

These APIs ensure Obsidian's internal index matches the file system state.

## Requirements

- Obsidian v0.15.0 or higher

## License

MIT License - Copyright (c) 2025 BitNinja01

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have suggestions, please [open an issue](https://github.com/BitNinja01/bn_obsidian_vault_refresh/issues) on GitHub.
