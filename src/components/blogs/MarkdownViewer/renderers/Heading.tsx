import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
}

export const generateHeading =
  (level: number) =>
  // eslint-disable-next-line react/display-name
  ({ children }: HeadingProps) => {
    const slug = (children as string).toLowerCase().replace(/\s/g, '_');

    return React.createElement(`h${level}`, { id: slug }, children);
  };
