'use client';

import React from 'react';
import classNames from 'classnames/bind';

import styles from './Tabs.module.scss';

const cx = classNames.bind(styles);

export interface Tab {
  name: string;
  key: string;
}

interface TabsProps {
  tabs: Tab[];
  selectedTabKey: string;
  onClick: (tab: Tab) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, selectedTabKey, onClick }) => {
  return (
    <ul className={cx('Tabs')}>
      {tabs.map((tab) => (
        <li key={tab.key} className={cx(tab.key === selectedTabKey && 'selected')}>
          <button onClick={() => onClick(tab)} className={cx('item-button')}>
            {tab.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
