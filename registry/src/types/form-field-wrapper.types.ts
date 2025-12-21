import { FieldValues } from 'react-hook-form';
import { FormFieldConfig } from './form-field.types';

export interface FormFieldWrapperProps<T extends FieldValues> {
  formField: FormFieldConfig<T>;
}
