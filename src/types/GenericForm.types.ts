import { z, ZodObject, ZodRawShape } from "zod";
import { DefaultValues, FieldValues, Path } from "react-hook-form";

// ✅ Form Field Definition
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

// ✅ Generic Form Props
export interface GenericFormProps<T extends ZodObject<ZodRawShape>> {
  formConfig: {
    formFields: FormFieldConfig<z.infer<T>>[];
    validationSchema: T;
    defaultValues: DefaultValues<z.infer<T>>;
  };

  formSettings?: {
    mode?: "onSubmit" | "onBlur" | "onChange" | "all";
    disabled?: boolean;
    className?: string;
  };

  layoutSettings?: {
    layout?: "flex" | "grid";
    columns?: number;
    gap?: number;
  };

  actions: {
    submitButtonText?: string;
    cancelButtonText?: string;
    onSubmit: (values: z.infer<T>) => void;
    onError?: (errors: Record<string, unknown>) => void;
    onCancel?: () => void;
  };
}

export default GenericFormProps;
