// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from "path";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const languages = ["typescript", "javascript"];
	const window = vscode.window;
	const workspace = vscode.workspace;

	const isTestRegex = /^((\s*)(it|describe)(\s*)\((\s*)('|"))/g;
	const isTestSetRegex = /^((\s*)(describe)(\s*)\((\s*)('|"))/g;
	const testNameRegex = /(("|')(.*?)("|'))/;

	function provideCodeLenses(
		document: vscode.TextDocument,
		token: vscode.CancellationToken
	) {
		if (!window || !window.activeTextEditor) return;

		let matches: Match[] = [];
		let activeDocument = window.activeTextEditor.document;

		for (let index = 0; index < activeDocument.lineCount; index++) {
			const lineText = activeDocument.lineAt(index).text;

			if (isTestRegex.test(lineText)) {
				const testNameMatch = lineText.match(testNameRegex);

				const match: Match = {
					range: new vscode.Range(
						new vscode.Position(index, 0),
						new vscode.Position(index, 5)
					),
					testName: testNameMatch ? testNameMatch[3] : "",
					testFile: activeDocument.fileName,
					isTestSet: isTestSetRegex.test(lineText),
				};

				matches.push(match);
			}
		}

		return matches.map(
			(match) =>
				new vscode.CodeLens(match.range, {
					title: match.isTestSet ? "Run tests" : "Run test",
					command: "extension.executeProtractorTest",
					arguments: [match],
				})
		);
	}

	function getProtractorConfigPath() {
		const configuration = workspace.getConfiguration(
			"protractor-conf-file-path"
		);

		let protactorConfigPath = "";
		if (
			workspace &&
			workspace.rootPath &&
			configuration &&
			configuration.protractorConfiguration
		) {
			protactorConfigPath = path.join(
				workspace.rootPath,
				configuration.protractorConfiguration
			);
		}

		return protactorConfigPath;
	}

	let disposable = vscode.commands.registerCommand(
		"extension.executeProtractorTest",
		(match) => {
			const terminal = window.createTerminal();
			terminal.show();

			const protactorConfigPath = getProtractorConfigPath();
			const testFile = match.testFile;
			const testName = match.testName;

			// const wsedit = new vscode.WorkspaceEdit();

			// const wsPath = workspace.rootPath;
			// const filePath = vscode.Uri.file(wsPath + "/.vscode/launch.json");
			// vscode.window.showInformationMessage(filePath.toString());

			// wsedit.createFile(filePath, { ignoreIfExists: true });

			// vscode.workspace.applyEdit(wsedit);
			// vscode.window.showInformationMessage("Created a new file: launch.json");

			terminal.sendText(`cd "${workspace.rootPath}"`);
			terminal.sendText(
				`node node_modules/protractor/bin/protractor ${protactorConfigPath} --specs='${testFile}' --grep="${testName}"`
			);
		}
	);

	// let helloWorldDisposable = vscode.commands.registerCommand(
	// 	"run-debug-protractor.helloWorld",
	// 	() => {
	// 		vscode.window.showInformationMessage(
	// 			"Hello from my Protractor Extension"
	// 		);
	// 	}
	// );

	languages.forEach((language) => {
		context.subscriptions.push(
			vscode.languages.registerCodeLensProvider(language, { provideCodeLenses })
		);
	});

	context.subscriptions.push(disposable);
	// context.subscriptions.push(helloWorldDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

export interface Match {
	range: vscode.Range;
	testName: string;
	testFile: string;
	isTestSet: boolean;
}
