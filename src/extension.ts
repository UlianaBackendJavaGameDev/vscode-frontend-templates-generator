import *  as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';



export function activate(context:vscode.ExtensionContext){

	let disposable = vscode.commands.registerCommand('my-first-extension.helloWorld', async () => {
		const workspaceFolders = vscode.workspace.workspaceFolders;
		

		if(!workspaceFolders){
			vscode.window.showErrorMessage('Откройте папку проекта через File -> Open Folder!');
			return;
		}

		const projectRoot = workspaceFolders[0].uri.fsPath;
		const htmlPath = path.join(projectRoot, 'index.html');
		const cssPath = path.join(projectRoot, 'style.css');



		const htmlContent = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Новая страница</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>
    <main class="container">
	<h1>Привет, Мир!</h1>
	<p>Шаблон сгенерирован!</p>
</body>
</html>`;

		const cssContent = `* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #0f172a;
    color: #f8fafc;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.container {
    text-align: center;
    padding: 2rem;
    background-color: #1e293b;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

h1 {
    color: #38bdf8;
    margin-bottom: 1rem;
}`
		try{
			fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
			fs.writeFileSync(cssPath, cssContent, 'utf-8');

			const document = await vscode.workspace.openTextDocument(htmlPath);
			await vscode.window.showTextDocument(document);

			vscode.window.showInformationMessage('Файлы index.html и style.css успешно созданы!');
		}catch(error){
			vscode.window.showErrorMessage('Ошибка при создании файлов: ' + error);
		}
	});
	context.subscriptions.push(disposable);
}
export function deactivate(){}