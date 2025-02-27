import { FieldValues, Path } from "react-hook-form";

export interface FormFieldConfig<T extends FieldValues> {
  name: Path<T>;
  label: string;
  component: React.ElementType;
  props?: Record<string, unknown>;
  width?: "full" | "half" | string;
  eventProp?: string;
  valueProp?: string;
  condition?: (values: T) => boolean;
  customEventHandler?: (event: unknown, field: unknown) => void;
  description?: string;
}
