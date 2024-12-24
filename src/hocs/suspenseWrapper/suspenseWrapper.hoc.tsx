'use client';

import React, { Suspense } from 'react';

export const suspenseWrapperHoc =
  <Props extends object>(WrappedComponent: React.ComponentType<Props>, LoadingComponent: React.ReactNode) =>
  // eslint-disable-next-line react/display-name
  (props: Props) => {
    return (
      <Suspense fallback={LoadingComponent}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
