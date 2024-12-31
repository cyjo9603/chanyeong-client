import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import cb from 'react-syntax-highlighter/dist/esm/styles/prism/cb';
import classNames from 'classnames/bind';

import styles from '../MarkdownViewer.module.scss';

const cx = classNames.bind(styles);

interface CodeProps {
  className?: string;
  children: React.ReactNode;
}

const Code: React.FC<CodeProps> = ({ className, children, ...rest }) => {
  const match = /language-(\w+)/.exec(className || '');
  const [, language] = match || [];

  return match ? (
    <SyntaxHighlighter style={cb} language={language}>
      {String(children)}
    </SyntaxHighlighter>
  ) : (
    <code {...rest} className={cx('Code', className)}>
      {children}
    </code>
  );
};

export default Code;
