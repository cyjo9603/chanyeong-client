'use client';

import React from 'react';
import classNames from 'classnames/bind';

import styles from './Tag.module.scss';

const cx = classNames.bind(styles);

interface TagProps {
  name: string;
  count?: number;
  selected?: boolean;
  className?: string;
  onClick?: (tagName: string) => void;
}

const Tag: React.FC<TagProps> = ({ name, count, selected, className, onClick }) => {
  return (
    <button onClick={() => onClick?.(name)} className={cx('Tag', selected && 'selected', className)}>
      {name}
      {count && <span className={cx('count')}>{count}</span>}
    </button>
  );
};

export const TagLoading: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={cx('Tag', 'loading', className)}>&nbsp;</div>;
};

export default Tag;
