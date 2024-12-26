'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  useFormContext,
  ControllerRenderProps,
  FieldValues,
  FieldError,
  ValidationRule,
  Controller,
  InternalFieldName,
  FieldValue,
} from 'react-hook-form';

export interface ControllerCustomOptions {
  required?: ValidationRule<boolean>;
  min?: ValidationRule<number | string>;
  max?: ValidationRule<number | string>;
  minLength?: ValidationRule<number>;
  maxLength?: ValidationRule<number>;
  shouldUnregister?: boolean;
  onChange?: (event: any) => void;
  onBlur?: (event: any) => void;
  disabled?: boolean;
  deps?: InternalFieldName | InternalFieldName[];
  defaultValue?: FieldValue<FieldValues>;
  valueAsNumber?: boolean;
  className?: string;
}

export interface HookFormFieldCoreProps extends ControllerCustomOptions {
  id?: string;
  name: string;
  className?: string;
  field?: ControllerRenderProps<FieldValues, string>;
  error?: FieldError;
}

export const hookFormFieldHoc =
  <T extends HookFormFieldCoreProps>(FieldComponent: React.FC<T>, defaultOptions?: ControllerCustomOptions) =>
  // eslint-disable-next-line react/display-name
  (props: T) => {
    const { name } = props;
    const { control } = useFormContext();

    const isValueAsNumber = props.valueAsNumber || defaultOptions?.valueAsNumber;

    return (
      <Controller
        name={name}
        shouldUnregister={props.shouldUnregister}
        defaultValue={props.defaultValue}
        control={control}
        rules={{
          required: props.required || defaultOptions?.required,
          min: props.min || defaultOptions?.min,
          max: props.max || defaultOptions?.max,
          maxLength: props.maxLength || defaultOptions?.maxLength,
          minLength: props.minLength || defaultOptions?.minLength,
          onBlur: props.onBlur || defaultOptions?.onBlur,
          onChange: props.onChange || defaultOptions?.onChange,
          deps: props.deps || defaultOptions?.deps,
        }}
        render={({ field, fieldState }) => (
          <FieldComponent
            {...props}
            disabled={props.disabled || defaultOptions?.disabled}
            field={
              !isValueAsNumber
                ? field
                : { ...field, onChange: (event: any) => field.onChange?.(Number(event.target.value)) }
            }
            error={fieldState.error}
          />
        )}
      />
    );
  };

export default hookFormFieldHoc;
