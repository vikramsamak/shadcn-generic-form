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

export interface PlaygroundField extends Omit<FormFieldConfig<any>, 'render'> {
  id: string; // Unique ID for draggable/key
  type:
    | 'text'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'slider'
    | 'datePicker'
    | 'switch';
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
