import { FormFieldConfig } from '@/types/FormField.types';

export interface LayoutSettings {
  layout: 'grid' | 'flex';
  columns: number;
  gap: number;
}

export interface FormSettings {
  mode: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
  disabled: boolean;
}

export interface FormActionsSettings {
  submitButtonText: string;
  cancelButtonText: string;
  showCancel: boolean;
}

export type FieldType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'slider'
  | 'datePicker'
  | 'switch';

export interface PlaygroundField extends Omit<FormFieldConfig<any>, 'render'> {
  id: string; // Unique ID for draggable/key
  type: FieldType;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  validation?: {
    min?: number;
    max?: number;
  };
}

export interface PlaygroundState {
  layoutSettings: LayoutSettings;
  formSettings: FormSettings;
  actions: FormActionsSettings;
  fields: PlaygroundField[];
}
