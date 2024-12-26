/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

interface ConditionalFieldProps<T extends any> {
  children: (value: T) => React.ReactNode;
  targetFieldName: string | string[];
}

const ConditionalField = <T extends any>({ children, targetFieldName }: ConditionalFieldProps<T>) => {
  const { control } = useFormContext();
  const target: T = useWatch({ control, name: targetFieldName as string });

  return <>{children(target)}</>;
};

export default ConditionalField;
