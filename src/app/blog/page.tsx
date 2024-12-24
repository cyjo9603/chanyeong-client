'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import classNames from 'classnames/bind';

import { BLOG_TAB_SELECTED_KEY, BLOG_TAG_SELECTED_KEY, TabKey } from '@/constants/searchParams.constant';
import Tabs, { Tab } from '@/components/commons/Tabs';
import TagList from '@/components/blogs/TagList';
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
  const selectedTagKey = searchParams.get(BLOG_TAG_SELECTED_KEY) ?? undefined;

  const handleTabClick = (tab: Tab) => {
    router.replace(`${pathname}?${createQueryString(BLOG_TAB_SELECTED_KEY, tab.key, searchParams)}`);
  };

  const handleTagClick = (tagName: string) => {
    const alreadySelected = searchParams.get(BLOG_TAG_SELECTED_KEY) === tagName;

    router.replace(
      `${pathname}?${createQueryString(BLOG_TAG_SELECTED_KEY, alreadySelected ? undefined : tagName, searchParams)}`
    );
  };

  return (
    <div className={cx('BlogPage')}>
      <div className={cx('main')}>
        <div>
          <Tabs tabs={tabs} onClick={handleTabClick} selectedTabKey={selectedTabKey} />
        </div>
        <section></section>
      </div>
      <aside className={cx('side')}>
        <div className={cx('side-title')}>Tags</div>
        <TagList seletedTag={selectedTagKey} onClick={handleTagClick} />
      </aside>
    </div>
  );
};

export default BlogPage;
