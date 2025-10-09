import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

export interface FormFieldConfig<
  T extends FieldValues,
  E extends Event = Event,
> {
  name: Path<T>;
  label: string;
  render: (field: ControllerRenderProps<T>) => React.ReactElement;
  props?: Record<string, unknown>;
  width?: 'full' | 'half' | string;
  condition?: (values: T) => boolean;
  description?: string;
}
