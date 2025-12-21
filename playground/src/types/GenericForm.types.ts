import { z, ZodObject, ZodRawShape } from 'zod';
import { DefaultValues } from 'react-hook-form';
import { FormFieldConfig } from './FormField.types';

export interface GenericFormProps<T extends ZodObject<ZodRawShape>> {
  formConfig: {
    formFields: FormFieldConfig<z.input<T>>[];
    validationSchema: T;
    defaultValues: DefaultValues<z.input<T>>;
  };

  formSettings?: {
    mode?: 'onSubmit' | 'onBlur' | 'onChange' | 'onTouched' | 'all';
    disabled?: boolean;
    className?: string;
  };

  layoutSettings?: {
    layout?: 'flex' | 'grid';
    columns?: number;
    gap?: number;
  };

  actions: {
    submitButtonText?: string;
    cancelButtonText?: string;
    submitBtnClassName?: string;
    cancelBtnClassName?: string;
    onSubmit: (values: z.output<T>) => void;
    onError?: (errors: Record<string, unknown>) => void;
    onCancel?: () => void;
  };
}

export default GenericFormProps;
