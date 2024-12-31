'use client';

import React from 'react';
import { Editor, EditorProps } from '@toast-ui/react-editor';
import Prism from 'prismjs';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import 'prismjs/components/prism-jsx.js';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-tsx.js';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-css.js';

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

const plugins = [colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]];

const ToastUIEditor: React.FC<EditorProps> = (props) => {
  return <Editor {...props} plugins={plugins} />;
};

export default ToastUIEditor;
