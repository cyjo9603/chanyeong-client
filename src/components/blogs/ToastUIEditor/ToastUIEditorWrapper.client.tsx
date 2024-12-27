'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import classNames from 'classnames/bind';
import { EditorProps } from '@toast-ui/react-editor';

import { useDarkmode } from '@/hooks/useDarkmode';

import styles from './ToastUIEditor.module.scss';

const cx = classNames.bind(styles);

const Editor = dynamic<EditorProps>(() => import('./ToastUIEditor.client'), { ssr: false });

const ToastUIEditorWrapper = () => {
  const [isDarkmode] = useDarkmode();

  return (
    <div className={cx('ToastUIEditor')}>
      <Editor height="100%" previewStyle="vertical" initialValue=" " theme={isDarkmode ? 'dark' : 'light'} />
    </div>
  );
};

export default ToastUIEditorWrapper;
