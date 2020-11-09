import * as vscode from "vscode";

export function getDebugConfiguration(
	config: vscode.DebugConfiguration
): vscode.ProviderResult<vscode.DebugConfiguration> {
	if (!config.type && !config.request && !config.name) {
		const editor = vscode.window.activeTextEditor;
		const workspaceFolder = "${workspaceFolder}";

		console.log(`workspaceFolder debug config: ${workspaceFolder}`);

		if (editor && editor.document.languageId === "typescript") {
			config.type = "node";
			config.name = "Launch";
			config.request = "launch";
			config.program =
				"${workspaceFolder}\\node_modules\\protractor\\bin\\protractor";
			config.args = [
				"-r",
				"ts-node/register",
				"${workspaceFolder}\\protractor.conf.js",
			];
			config.sourceMaps = true;
			config.protocol = "inspector";
		}

		if (!config.program) {
			return vscode.window
				.showInformationMessage("Cannot find a program to debug")
				.then((_) => {
					return undefined; // abort launch
				});
		}
	}

	return config;
}

class ProtractorConfigurationProvider
	implements vscode.DebugConfigurationProvider {
	resolveDebugConfiguration(
		folder: vscode.WorkspaceFolder | undefined,
		config: vscode.DebugConfiguration,
		token?: vscode.CancellationToken
	): vscode.ProviderResult<vscode.DebugConfiguration> {
		if (!config.type && !config.request && !config.name) {
			const editor = vscode.window.activeTextEditor;
			const workspaceFolder = "${workspaceFolder}";

			console.log(`workspaceFolder debug config: ${workspaceFolder}`);

			if (editor && editor.document.languageId === "typescript") {
				config.type = "node";
				config.name = "Launch";
				config.request = "launch";
				config.program =
					"${workspaceFolder}\\node_modules\\protractor\\bin\\protractor";
				config.args = [
					"-r",
					"ts-node/register",
					"${workspaceFolder}\\protractor.conf.js",
				];
				config.sourceMaps = true;
				config.protocol = "inspector";
			}

			if (!config.program) {
				return vscode.window
					.showInformationMessage("Cannot find a program to debug")
					.then((_) => {
						return undefined; // abort launch
					});
			}
		}

		return config;
	}
}
