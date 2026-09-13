// ==UserScript==
// @name         Inline Base64 Reveal
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Automatically detects and decodes Base64 strings, displaying them in a minimal UI box with a copy function.
// @author       hv33y
// @match        *://*/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    function decodeBase64(str) {
        str = str.trim();
        if (str.length < 16) return null;
        if (!/^[a-zA-Z0-9+/]+={0,2}$/.test(str)) return null;

        try {
            let decoded = atob(str);
            if (/^[\x20-\x7E\n\r]+$/.test(decoded)) {
                if (!decoded.startsWith('http') && decoded.length < 10) return null;
                return decoded;
            }
        } catch (e) {
            return null;
        }
        return null;
    }

    function injectDecodedUI(targetElement, decodedText) {
        if (targetElement.dataset.b64Decoded) return;
        targetElement.dataset.b64Decoded = 'true';

        const box = document.createElement('span');
        box.style.marginLeft = '12px';
        box.style.fontFamily = 'monospace';
        box.style.fontSize = '0.9em';
        box.style.display = 'inline-flex';
        box.style.alignItems = 'center';
        box.style.gap = '12px';
        box.style.padding = '4px 10px';
        box.style.border = '1px solid rgba(128, 128, 128, 0.3)';
        box.style.borderRadius = '6px';
        box.style.backgroundColor = 'rgba(128, 128, 128, 0.08)';
        box.style.verticalAlign = 'middle';

        const contentWrapper = document.createElement('span');
        if (decodedText.startsWith('http://') || decodedText.startsWith('https://')) {
            const link = document.createElement('a');
            link.href = decodedText;
            link.target = '_blank';
            link.textContent = decodedText;
            link.style.color = '#58a6ff';
            link.style.textDecoration = 'none';
            link.onmouseover = () => link.style.textDecoration = 'underline';
            link.onmouseout = () => link.style.textDecoration = 'none';
            contentWrapper.appendChild(link);
        } else {
            const textSpan = document.createElement('span');
            textSpan.textContent = decodedText;
            textSpan.style.color = '#3fb950';
            contentWrapper.appendChild(textSpan);
        }
        box.appendChild(contentWrapper);

        const controlsGroup = document.createElement('div');
        controlsGroup.style.display = 'inline-flex';
        controlsGroup.style.alignItems = 'center';
        controlsGroup.style.gap = '8px';
        controlsGroup.style.borderLeft = '1px solid rgba(128, 128, 128, 0.3)';
        controlsGroup.style.paddingLeft = '12px';

        const copyBtn = document.createElement('button');
        // Fixed: fromCodePoint handles higher-plane Unicode characters like emojis
        copyBtn.textContent = String.fromCodePoint(128203);
        copyBtn.style.background = 'transparent';
        copyBtn.style.border = 'none';
        copyBtn.style.cursor = 'pointer';
        copyBtn.style.padding = '0';
        copyBtn.style.fontSize = '1.1em';
        copyBtn.style.opacity = '0.7';
        copyBtn.style.transition = 'opacity 0.2s';
        copyBtn.title = 'Copy decoded text';

        copyBtn.onmouseover = () => copyBtn.style.opacity = '1';
        copyBtn.onmouseout = () => copyBtn.style.opacity = '0.7';

        copyBtn.onclick = (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(decodedText).then(() => {
                copyBtn.textContent = String.fromCodePoint(9989);
                setTimeout(() => copyBtn.textContent = String.fromCodePoint(128203), 1500);
            });
        };
        controlsGroup.appendChild(copyBtn);

        // Obfuscated author tag structure
        const _0x1c = document.createElement(String.fromCharCode(97));
        _0x1c.href = [104,116,116,112,115,58,47,47,103,105,116,104,117,98,46,99,111,109,47,104,118,51,51,121].map(c=>String.fromCharCode(c)).join('');
        _0x1c.target = String.fromCharCode(95,98,108,97,110,107);
        _0x1c.textContent = [64,104,118,51,51,121].map(c=>String.fromCharCode(c)).join('');
        _0x1c.style.fontSize = '0.85em';
        _0x1c.style.color = '#8b949e';
        _0x1c.style.textDecoration = 'none';
        _0x1c.onmouseover = () => _0x1c.style.color = '#c9d1d9';
        _0x1c.onmouseout = () => _0x1c.style.color = '#8b949e';

        controlsGroup.appendChild(_0x1c);
        box.appendChild(controlsGroup);

        targetElement.parentNode.insertBefore(box, targetElement.nextSibling);
    }

    function processNode(node) {
        let targets = [];
        if (node.nodeName === 'CODE') {
            targets.push(node);
        } else if (node.querySelectorAll) {
            targets = node.querySelectorAll('code');
        }

        targets.forEach(codeEl => {
            const text = codeEl.textContent;
            const decoded = decodeBase64(text);
            if (decoded) {
                injectDecodedUI(codeEl, decoded);
            }
        });
    }

    processNode(document.body);

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    processNode(node);
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

})();
