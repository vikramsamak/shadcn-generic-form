import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { cn } from "@/lib/utils";
import { Control, Path, FieldValues } from "react-hook-form";
import { FormFieldConfig } from "@/types";

interface FormFieldWrapperProps<T extends FieldValues> {
  formField: FormFieldConfig<T>;
  control: Control<T>;
}

function FormFieldWrapper<T extends FieldValues>({
  formField,
  control,
}: FormFieldWrapperProps<T>) {
  const {
    name,
    label,
    component: FieldComponent,
    props,
    width = "full",
    eventProp,
    valueProp,
    customEventHandler,
    description,
  } = formField;

  return (
    <FormField
      control={control}
      name={name as Path<T>}
      render={({ field }) => {
        const eventHandler = eventProp
          ? {
              [eventProp]: customEventHandler
                ? (e: unknown) => customEventHandler(e, field)
                : field.onChange,
            }
          : {};
        const valueHandler = valueProp ? { [valueProp]: field.value } : {};

        return (
          <FormItem className={cn(width === "half" ? "w-1/2" : "w-full")}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <FieldComponent
                {...field}
                {...props}
                {...eventHandler}
                {...valueHandler}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export default FormFieldWrapper;
