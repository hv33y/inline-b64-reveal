# Inline Base64 Reveal

A lightweight userscript designed to streamline the process of reading obfuscated or hashed URLs in plaintext formats. The script operates client-side to parse Base64 strings embedded in standard code blocks and renders them dynamically next to the original source.

![Inline Base64 Reveal Preview](https://github.com/user-attachments/assets/4628acaf-9277-4609-a24b-29ee49f7ec66)

## Features

* **Automatic Decoding:** Validates and resolves Base64 strings over 16 characters in length to prevent false positives.
* **Inline UI:** Injects a minimalist, containerized box alongside the original hash without disrupting page layout.
* **Smart Parsing:** Automatically routes decoded links to clickable anchor tags and plain text to color-coded spans.
* **Dynamic DOM Observation:** Utilizes a MutationObserver to ensure strings loaded asynchronously via infinite scroll or expandable menus are parsed upon rendering.
* **Clipboard Support:** Integrates directly with the system clipboard for one-click copying.

## Installation

**Step 1: Install a Userscript Manager**
First, install a userscript manager extension for your web browser:
* [Violentmonkey](https://violentmonkey.github.io/get-it/) (Recommended)
* [Tampermonkey](https://www.tampermonkey.net/)

**Step 2: Install the Script**
Once your manager is installed and enabled, click the link below. Your userscript manager will automatically catch the file and prompt you with an install screen.

* [Click here to install Inline Base64 Reveal](https://raw.githubusercontent.com/hv33y/inline-b64-reveal/master/script.user.js)

*(Note: Ensure the script file in your repository is saved with the [`script.user.js`](script.user.js) extension so the browser extension can automatically detect and grab it.)*

## License

[MIT License](LICENSE)

Copyright (c) 2026 [hv33y](https://github.com/hv33y)
