import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

export interface FormFieldConfig<T extends FieldValues> {
  name: Path<T>;
  label: string;
  render: (field: ControllerRenderProps<T>) => React.ReactElement;
  width?: "full" | "half" | string;
  condition?: (values: T) => boolean;
  description?: string;
}
