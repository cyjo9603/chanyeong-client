import React from 'react';
import { useForm, FormProvider, FieldValues, UseFormProps, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';

interface ServiceFormProps<T extends FieldValues> extends Pick<UseFormProps<T>, 'mode' | 'shouldUnregister'> {
  externalValues?: UseFormProps<T>['defaultValues'];
  onSubmit: SubmitHandler<T>;
  onSubmitError?: SubmitErrorHandler<T>;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const ServiceForm = <T extends FieldValues>({
  onSubmit,
  onSubmitError,
  externalValues,
  mode,
  shouldUnregister,
  className,
  children,
  disabled,
}: ServiceFormProps<T>) => {
  const methods = useForm<T>({ defaultValues: externalValues, mode, shouldUnregister: shouldUnregister ?? true });

  const { handleSubmit, reset } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={!disabled ? handleSubmit(onSubmit, onSubmitError) : undefined}
        onReset={() => reset()}
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default ServiceForm;
