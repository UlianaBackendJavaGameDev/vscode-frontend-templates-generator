import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('my-first-extension.generateTemplate', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;

        if (!workspaceFolders) {
            vscode.window.showErrorMessage('Откройте папку проекта в VS Code!');
            return;
        }

        const rootUri = workspaceFolders[0].uri;

        try {
            // 1. Создаем структуру директорий
            const cssUri = vscode.Uri.joinPath(rootUri, 'css');
            const jsUri = vscode.Uri.joinPath(rootUri, 'js');
            const imgUri = vscode.Uri.joinPath(rootUri, 'assets', 'images');

            await vscode.workspace.fs.createDirectory(cssUri);
            await vscode.workspace.fs.createDirectory(jsUri);
            await vscode.workspace.fs.createDirectory(imgUri);

            // 2. Файл css/reset.css — Полный профессиональный сброс стилей
            const resetCssContent = new TextEncoder().encode(`/* ==========================================================================
   CSS RESET & BASE SETUP
   ========================================================================== */

*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
}

body {
    min-height: 100vh;
    text-rendering: optimizeSpeed;
}

ul, ol {
    list-style: none;
}

a {
    color: inherit;
    text-decoration: none;
}

img, picture, svg {
    max-width: 100%;
    display: block;
}

input, button, textarea, select {
    font: inherit;
    border: none;
    outline: none;
}

button {
    cursor: pointer;
    background: none;
}
`);
            await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(cssUri, 'reset.css'), resetCssContent);

            // 3. Файл css/style.css — Основные стили макета
            const styleCssContent = new TextEncoder().encode(`/* Импорт сброса стилей */
@import 'reset.css';

:root {
    --bg-main: #0f172a;
    --bg-card: #1e293b;
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --accent: #38bdf8;
    --accent-hover: #0284c7;
    --border: #334155;
    --container-width: 1100px;
}

body {
    background-color: var(--bg-main);
    color: var(--text-main);
}

.container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 20px;
}

/* === Шапка (Header) === */
.header {
    background-color: rgba(30, 41, 59, 0.8);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 100;
}

.header-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
}

.logo {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--accent);
}

.nav-list {
    display: flex;
    gap: 25px;
}

.nav-link:hover {
    color: var(--accent);
    transition: color 0.2s ease;
}

/* === Главный баннер (Hero) === */
.hero {
    padding: 80px 0;
    text-align: center;
}

.hero-title {
    font-size: 2.8rem;
    font-weight: 800;
    margin-bottom: 20px;
    background: linear-gradient(135deg, #38bdf8, #818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hero-subtitle {
    font-size: 1.2rem;
    color: var(--text-muted);
    max-width: 600px;
    margin: 0 auto 30px;
}

.hero-image {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 12px;
    margin-top: 30px;
    border: 1px solid var(--border);
}

/* === Кнопки (Buttons) === */
.btn {
    display: inline-block;
    padding: 12px 28px;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.2s ease;
}

.btn-primary {
    background-color: var(--accent);
    color: #0f172a;
}

.btn-primary:hover {
    background-color: var(--accent-hover);
    color: #ffffff;
    transform: translateY(-2px);
}

/* === Секция с Формой (Form Section) === */
.contact-section {
    padding: 60px 0;
    background-color: var(--bg-card);
    border-radius: 16px;
    border: 1px solid var(--border);
    margin: 40px auto;
}

.form-title {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 30px;
}

.form {
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-group label {
    font-size: 0.9rem;
    color: var(--text-muted);
}

.form-input, .form-textarea {
    background-color: var(--bg-main);
    border: 1px solid var(--border);
    color: var(--text-main);
    padding: 12px 16px;
    border-radius: 8px;
    transition: border-color 0.2s;
}

.form-input:focus, .form-textarea:focus {
    border-color: var(--accent);
}

.form-textarea {
    resize: vertical;
    min-height: 120px;
}

/* === Подвал (Footer) === */
.footer {
    border-top: 1px solid var(--border);
    padding: 30px 0;
    text-align: center;
    color: var(--text-muted);
    font-size: 0.9rem;
    margin-top: 60px;
}
`);
            await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(cssUri, 'style.css'), styleCssContent);

            // 4. Файл index.html — Готовая разметка настоящего сайта
            const htmlContent = new TextEncoder().encode(`<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Современный Сайт</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <!-- Шапка сайта -->
    <header class="header">
        <div class="container header-nav">
            <a href="#" class="logo">⚡ MyBrand</a>
            <nav>
                <ul class="nav-list">
                    <li><a href="#hero" class="nav-link">Главная</a></li>
                    <li><a href="#features" class="nav-link">Возможности</a></li>
                    <li><a href="#contact" class="nav-link">Контакты</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main class="container">
        <!-- Главный баннер -->
        <section id="hero" class="hero">
            <h1 class="hero-title">Создавай проекты с удовольствием</h1>
            <p class="hero-subtitle">Готовый профессиональный шаблон с чистым сбросом стилей, адаптивной версткой и интерактивными элементами.</p>
            <a href="#contact" class="btn btn-primary">Связаться с нами</a>
            
            <!-- Плейсхолдер картинки -->
            <img class="hero-image" src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80" alt="Разработка кода">
        </section>

        <!-- Форма обратной связи -->
        <section id="contact" class="contact-section">
            <h2 class="form-title">Оставить заявку</h2>
            <form class="form" id="contactForm">
                <div class="form-group">
                    <label for="name">Ваше имя</label>
                    <input type="text" id="name" class="form-input" placeholder="Иван Иванов" required>
                </div>
                <div class="form-group">
                    <label for="email">Email адрес</label>
                    <input type="email" id="email" class="form-input" placeholder="name@example.com" required>
                </div>
                <div class="form-group">
                    <label for="message">Сообщение</label>
                    <textarea id="message" class="form-textarea" placeholder="Расскажите о вашей идее..." required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Отправить сообщение</button>
            </form>
        </section>
    </main>

    <!-- Подвал сайта -->
    <footer class="footer">
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} MyBrand. Все права защищены.</p>
        </div>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>`);
            await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(rootUri, 'index.html'), htmlContent);

            // 5. Файл js/main.js — Обработка формы
            const jsContent = new TextEncoder().encode(`// Обработка отправки формы
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Спасибо! Ваша заявка успешно отправлена.');
            form.reset();
        });
    }
});
`);
            await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(jsUri, 'main.js'), jsContent);

            vscode.window.showInformationMessage('🎉 Полноценный сайт с reset.css успешно сгенерирован!');

        } catch (error) {
            vscode.window.showErrorMessage(`Ошибка при генерации: ${error}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}