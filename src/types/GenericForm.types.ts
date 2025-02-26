import { TypeOf, z, ZodObject } from "zod";
import { DefaultValues, FieldValues, Path } from "react-hook-form";

// Form Field Definition
export interface FormFieldConfig<T extends FieldValues = FieldValues> {
  name: Path<T>; // ✅ Ensure it's a valid form field path
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

// Generic Form Props
export interface GenericFormProps<T extends FieldValues> {
  formConfig: {
    formFields: FormFieldConfig<T>[];
    validationSchema: ZodObject<T>;
    defaultValues: DefaultValues<TypeOf<ZodObject<T>>>;
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
    onSubmit: (values: z.infer<ZodObject<T>>) => void;
    onError?: (errors: Record<string, unknown>) => void;
    onCancel?: () => void;
  };
}

export default GenericFormProps;
