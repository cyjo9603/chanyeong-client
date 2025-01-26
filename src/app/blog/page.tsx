'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import classNames from 'classnames/bind';
import { useAtomValue } from 'jotai';

import { BLOG_TAB_SELECTED_KEY, BLOG_TAG_SELECTED_KEY, TabKey } from '@/constants/searchParams.constant';
import Tabs, { Tab } from '@/components/commons/Tabs';
import TagList from '@/components/blogs/TagList';
import PostCardList from '@/components/blogs/PostCardList';
import { createQueryString } from '@/utils/searchParams';
import FloatButton from '@/components/commons/FloatButton';
import { WriteIcon } from '@/assets';
import { userAtom } from '@/atoms/user.atom';
import { PostCategory } from '@/types/apollo';

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

  const user = useAtomValue(userAtom);

  const selectedTabKey = searchParams.get(BLOG_TAB_SELECTED_KEY) || TabKey.ALL;
  const selectedTagKey = searchParams.get(BLOG_TAG_SELECTED_KEY) ?? undefined;

  const handleTabClick = (tab: Tab) => {
    router.replace(`${pathname}?${createQueryString(BLOG_TAB_SELECTED_KEY, tab.key, searchParams)}`);
  };

  const handleWriteClick = () => {
    router.push('/blog/write');
  };

  const handleTagClick = (tagName: string) => {
    const alreadySelected = searchParams.get(BLOG_TAG_SELECTED_KEY) === tagName;

    router.replace(
      `${pathname}?${createQueryString(BLOG_TAG_SELECTED_KEY, alreadySelected ? undefined : tagName, searchParams)}`
    );
  };

  return (
    <div className={cx('BlogPage')}>
      <aside className={cx('side')}>
        <div className={cx('side-title')}>Tags</div>
        <TagList
          seletedTag={selectedTagKey}
          category={selectedTabKey !== TabKey.ALL ? (selectedTabKey as PostCategory) : undefined}
          onClick={handleTagClick}
        />
      </aside>
      <div className={cx('main')}>
        <div>
          <Tabs tabs={tabs} onClick={handleTabClick} selectedTabKey={selectedTabKey} />
        </div>
        <section className={cx('section')}>
          <PostCardList category={selectedTabKey !== TabKey.ALL ? selectedTabKey : undefined} tag={selectedTagKey} />
        </section>
      </div>
      {user && (
        <FloatButton onClick={handleWriteClick}>
          <WriteIcon />
        </FloatButton>
      )}
    </div>
  );
};

export default BlogPage;
