import { App, Notice, FileSystemAdapter } from 'obsidian';

export async function refreshVault(app: App): Promise<void> {
	const notice = new Notice('Refreshing vault...', 0);

	try {
		const adapter = app.vault.adapter as FileSystemAdapter;

		// Force initialization of the file cache by listing all files
		// This ensures internal structures are ready for reconciliation
		await app.vault.adapter.list('/');

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

			try {
				// @ts-ignore - accessing internal API
				await adapter.reconcileFolderCreation(relativePath);
			} catch (error) {
				// Silently continue - this may fail on first run but works on subsequent runs
				console.debug(`Could not reconcile directory ${relativePath} (may succeed on next refresh):`, error);
			}

			// Always recurse into subdirectories regardless of reconciliation result
			try {
				await reconcileDirectory(app, adapter, relativePath);
			} catch (error) {
				console.error(`Error processing directory ${relativePath}:`, error);
			}
		} else if (entry.isFile()) {
			try {
				// Get file stats for accurate mtime
				const stats = await adapter.stat(relativePath);
				const mtime = stats?.mtime || Date.now();

				// @ts-ignore - accessing internal API
				await adapter.reconcileFile(relativePath, relativePath, mtime);
			} catch (error) {
				console.error(`Error reconciling file ${relativePath}:`, error);
			}
		}
	}
}
