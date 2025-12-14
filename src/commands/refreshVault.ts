import { App, Notice, FileSystemAdapter } from 'obsidian';

export async function refreshVault(app: App): Promise<void> {
	const notice = new Notice('Refreshing vault...', 0);

	try {
		const adapter = app.vault.adapter as FileSystemAdapter;

		// Reconcile root folder first
		// @ts-ignore - accessing internal API
		await adapter.reconcileFolderCreation('');

		// Read filesystem recursively and reconcile all files
		await reconcileDirectory(app, adapter, '');

		notice.hide();
		new Notice('Vault refreshed successfully!', 5000);
	} catch (error) {
		notice.hide();
		new Notice(`Vault refresh failed: ${error.message}`, 5000);
		console.error('Vault refresh error:', error);
	}
}

async function reconcileDirectory(app: App, adapter: FileSystemAdapter, dirPath: string): Promise<void> {
	const basePath = adapter.getBasePath();
	const fullPath = dirPath ? `${basePath}/${dirPath}` : basePath;

	// @ts-ignore - accessing internal API
	const entries = await adapter.fsPromises.readdir(fullPath, { withFileTypes: true });

	for (const entry of entries) {
		const relativePath = dirPath ? `${dirPath}/${entry.name}` : entry.name;

		if (entry.isDirectory()) {
			// Skip .obsidian and other hidden directories
			if (entry.name.startsWith('.')) continue;

			// @ts-ignore - accessing internal API
			await adapter.reconcileFolderCreation(relativePath);
			await reconcileDirectory(app, adapter, relativePath);
		} else if (entry.isFile()) {
			// @ts-ignore - accessing internal API
			await adapter.reconcileFile(relativePath, relativePath, 0);
		}
	}
}
