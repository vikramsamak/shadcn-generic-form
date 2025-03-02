import { Control, FieldValues } from "react-hook-form";
import { FormFieldConfig } from "./FormField.types";

export interface FormFieldWrapperProps<T extends FieldValues> {
  formField: FormFieldConfig<T, Event>;
  control: Control<T>;
}
