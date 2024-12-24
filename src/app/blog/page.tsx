'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import classNames from 'classnames/bind';

import { BLOG_TAB_SELECTED_KEY, TabKey } from '@/constants/tab.constant';
import Tabs, { Tab } from '@/components/commons/Tabs';
import { createQueryString } from '@/utils/searchParams';

import styles from './page.module.scss';

const cx = classNames.bind(styles);

const tabs = [
  { name: 'All', key: TabKey.ALL },
  { name: 'Development', key: TabKey.DEVELOPMENT },
  { name: 'Diary', key: TabKey.DIARY },
];

const BlogPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedTabKey = searchParams.get(BLOG_TAB_SELECTED_KEY) || TabKey.ALL;

  const handleTabClick = (tab: Tab) => {
    router.replace(`${pathname}?${createQueryString(BLOG_TAB_SELECTED_KEY, tab.key, searchParams)}`);
  };

  return (
    <div className={cx('BlogPage')}>
      <Tabs tabs={tabs} onClick={handleTabClick} selectedTabKey={selectedTabKey} />
    </div>
  );
};

export default BlogPage;
