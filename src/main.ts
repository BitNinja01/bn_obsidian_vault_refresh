import { Plugin } from 'obsidian';
import { refreshVault } from './commands/refreshVault';

export default class VaultRefreshPlugin extends Plugin {
	async onload() {
		console.log('Loading Vault Refresh plugin');

		// Add ribbon icon
		this.addRibbonIcon('refresh-cw', 'Refresh Vault', async () => {
			await refreshVault(this.app);
		});

		// Add command for command palette
		this.addCommand({
			id: 'refresh-vault',
			name: 'Refresh Vault',
			callback: async () => {
				await refreshVault(this.app);
			}
		});
	}

	onunload() {
		console.log('Unloading Vault Refresh plugin');
	}
}
