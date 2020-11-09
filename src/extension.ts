// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const languages = ["typescript", "javascript"];
	const window = vscode.window;
	const workspace = vscode.workspace;

	const isTestRegex = /^((\s*)(it|describe)(\s*)\((\s*)('|"))/g;
	const isTestSetRegex = /^((\s*)(describe)(\s*)\((\s*)('|"))/g;
	const testNameRegex = /(("|')(.*?)("|'))/;

	const runCommand = "run_debug_protractor.runProtractorTest";
	const debugCommand = "run_debug_protractor.debugProtractorTest";

	const protractorPathProperty = "protractor.path";
	const protractorConfigPathProperty = "protractor.config.path";

	function provideCodeLenses(
		document: vscode.TextDocument,
		token: vscode.CancellationToken
	) {
		if (!window || !window.activeTextEditor) {
			return;
		}

		let matches: Match[] = [];
		let activeDocument = window.activeTextEditor.document;

		for (let index = 0; index < activeDocument.lineCount; index++) {
			const lineText = activeDocument.lineAt(index).text;

			if (isTestRegex.test(lineText)) {
				const testNameMatch = lineText.match(testNameRegex);

				const runMatch: Match = {
					range: new vscode.Range(
						new vscode.Position(index, 0),
						new vscode.Position(index, 5)
					),
					title: isTestSetRegex.test(lineText) ? "Run tests" : "Run test",
					testName: testNameMatch ? testNameMatch[3] : "",
					testFile: activeDocument.fileName,
					isTestSet: isTestSetRegex.test(lineText),
					isDebug: false,
				};

				const debugMatch: Match = {
					range: new vscode.Range(
						new vscode.Position(index, 8),
						new vscode.Position(index, 15)
					),
					title: isTestSetRegex.test(lineText) ? "Debug tests" : "Debug test",
					testName: testNameMatch ? testNameMatch[3] : "",
					testFile: activeDocument.fileName,
					isTestSet: isTestSetRegex.test(lineText),
					isDebug: true,
				};

				matches.push(runMatch);
				matches.push(debugMatch);
			}
		}

		return matches.map(
			(match) =>
				new vscode.CodeLens(match.range, {
					title: match.title,
					command: match.isDebug ? debugCommand : runCommand,
					arguments: [match],
				})
		);
	}

	function getProtractorConfigPath() {
		return workspace.getConfiguration().get(protractorConfigPathProperty);
	}

	function getProtractorPath() {
		return workspace.getConfiguration().get(protractorPathProperty);
	}

	const runProtractorTestCommand = vscode.commands.registerCommand(
		runCommand,
		(match) => {
			const terminal = window.createTerminal();
			terminal.show();

			const protactorConfigPath = getProtractorConfigPath();
			const protractorPath = getProtractorPath();

			const testFile = match.testFile;
			const testName = match.testName;

			terminal.sendText(`cd "${workspace.rootPath}"`);
			terminal.sendText(
				`node ${protractorPath} ${protactorConfigPath} --specs '${testFile}' --grep="${testName}"`
			);
		}
	);

	const debugProtractorTest = vscode.commands.registerCommand(
		debugCommand,
		(match) => {
			const protractorConfigPath = getProtractorConfigPath();
			const protractorPath = getProtractorPath();

			const { testFile, testName } = match;

			const debugConfiguration: vscode.DebugConfiguration = {
				name: "Debug Protractor Test",
				type: "node",
				request: "launch",
				program: protractorPath,
				args: [
					"-r",
					"ts-node/register",
					protractorConfigPath,
					`--specs ${testFile}`,
					`--grep="${testName}"`,
				],
				sourceMaps: true,
				protocol: "inspector",
			};

			vscode.debug.startDebugging(undefined, debugConfiguration);
		}
	);

	languages.forEach((language) => {
		context.subscriptions.push(
			vscode.languages.registerCodeLensProvider(language, { provideCodeLenses })
		);
	});

	context.subscriptions.push(runProtractorTestCommand);
	context.subscriptions.push(debugProtractorTest);
}

// this method is called when your extension is deactivated
export function deactivate() {}

export interface Match {
	range: vscode.Range;
	testName: string;
	testFile: string;
	isTestSet: boolean;
	title: string;
	isDebug: boolean;
}
