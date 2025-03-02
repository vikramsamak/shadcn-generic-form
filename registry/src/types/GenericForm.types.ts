import { z, ZodObject, ZodRawShape } from 'zod';
import { DefaultValues } from 'react-hook-form';
import { FormFieldConfig } from './FormField.types';

export interface GenericFormProps<T extends ZodObject<ZodRawShape>> {
  formConfig: {
    formFields: FormFieldConfig<z.infer<T>, Event>[];
    validationSchema: T;
    defaultValues: DefaultValues<z.infer<T>>;
  };

  formSettings?: {
    mode?: 'onSubmit' | 'onBlur' | 'onChange' | 'all';
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
    onSubmit: (values: z.infer<T>) => void;
    onError?: (errors: Record<string, unknown>) => void;
    onCancel?: () => void;
  };
}

export default GenericFormProps;
