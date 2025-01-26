'use client';

import React from 'react';
import { gql, useSuspenseQuery } from '@apollo/client';
import classNames from 'classnames/bind';

import { suspenseWrapperHoc } from '@/hocs/suspenseWrapper';
import Tag, { TagLoading } from '@/components/commons/Tag';
import { GetPostTagCountsQuery, GetPostTagCountsQueryVariables, PostCategory } from '@/types/apollo';

import styles from './TagList.module.scss';

const cx = classNames.bind(styles);

interface TagListProps {
  seletedTag?: string;
  category?: PostCategory;
  onClick?: (tagName: string) => void;
}

const TagList: React.FC<TagListProps> = ({ seletedTag, category, onClick }) => {
  const { data } = useSuspenseQuery<GetPostTagCountsQuery, GetPostTagCountsQueryVariables>(localQuery, {
    variables: { category: category ?? null },
  });

  return (
    <ul className={cx('TagList')}>
      {data.postTagCounts.map((tag) => (
        <li key={tag.name}>
          <Tag
            name={tag.name}
            count={tag.count}
            selected={seletedTag === tag.name}
            onClick={onClick}
            className={cx('item', seletedTag === tag.name && 'selected')}
          />
        </li>
      ))}
    </ul>
  );
};

export const localQuery = gql`
  query GetPostTagCounts($category: PostCategory) {
    postTagCounts(category: $category) {
      count
      name
    }
  }
`;

export const TagListLoading: React.FC = () => {
  return (
    <ul className={cx('TagList', 'loading')}>
      {new Array(6).fill(null).map((_, i) => (
        <li key={i} className={cx('loading-item')}>
          <TagLoading />
        </li>
      ))}
    </ul>
  );
};

export default suspenseWrapperHoc(TagList, <TagListLoading />);
