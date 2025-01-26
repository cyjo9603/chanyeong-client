'use client';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { BLOG_CONTENT_ELEMENT_ID, BLOG_HEADING_CLASS } from '@/constants/element.constant';

import styles from './Toc.module.scss';

const cx = classNames.bind(styles);

const Toc = () => {
  const [tocs, setTocs] = useState<{ slug: string; content: string; level: number }[]>([]);

  const maxTocLevel = Math.min(...tocs.map((toc) => toc.level));

  useEffect(() => {
    const contentElement = document.getElementById(BLOG_CONTENT_ELEMENT_ID);

    if (contentElement) {
      const headingElements = contentElement.querySelectorAll(`.${BLOG_HEADING_CLASS}`) || [];

      setTocs(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Array.from(headingElements).map(({ id, innerText, dataset }: any) => ({
          slug: id,
          content: innerText,
          level: Number(dataset?.eventLevel || 0),
        }))
      );
    }
  }, []);

  return (
    <ul className={cx('Toc')}>
      {tocs.map((toc) => (
        <li className={cx('content', `max-diff-${toc.level - maxTocLevel}`)} key={toc.slug}>
          <a href={`#${toc.slug}`}>{toc.content}</a>
        </li>
      ))}
    </ul>
  );
};

export default Toc;
