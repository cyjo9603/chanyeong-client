import React, { ReactElement } from 'react';

import { BLOG_HEADING_CLASS } from '@/constants/element.constant';

interface HeadingProps {
  children: React.ReactNode;
}

function flatten(children: string | ReactElement | (string | ReactElement)[]) {
  if (typeof children === 'string') {
    return children.toLowerCase().replace(/\s/g, '_');
  }

  if (Array.isArray(children)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (children as ReactElement[]).map((child): any => flatten(child)).join('');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return flatten((children.props as any).children);
}

export const generateHeading =
  (level: number) =>
  // eslint-disable-next-line react/display-name
  ({ children }: HeadingProps) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const slug = flatten(children as any);

    return React.createElement(
      `h${level}`,
      { id: slug, className: BLOG_HEADING_CLASS, 'data-event-level': level },
      children
    );
  };
