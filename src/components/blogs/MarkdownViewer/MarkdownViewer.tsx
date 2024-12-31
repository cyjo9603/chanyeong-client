import React from 'react';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames/bind';

import { generateHeading } from './renderers/Heading';
import Code from './renderers/Code';

import styles from './MarkdownViewer.module.scss';

const cx = classNames.bind(styles);

const renderers = {
  h1: generateHeading(1),
  h2: generateHeading(2),
  h3: generateHeading(3),
  h4: generateHeading(4),
  h5: generateHeading(5),
  h6: generateHeading(6),
  code: Code,
};

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  return (
    <ReactMarkdown className={cx('MarkdownViewer')} components={renderers}>
      {content}
    </ReactMarkdown>
  );
};

export default PostContent;
