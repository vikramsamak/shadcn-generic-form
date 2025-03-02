import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { FieldValues } from "react-hook-form";
import { FormFieldWrapperProps } from "@/types";
import { JSX } from "react";

function FormFieldWrapper<T extends FieldValues>({
  formField,
  control,
}: FormFieldWrapperProps<T>): JSX.Element {
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
      name={name}
      render={({ field }) => {
        const { onChange, value, ...fieldWithoutOnChangeAndValue } = field;

        const eventHandler = eventProp
          ? {
              [eventProp]: customEventHandler
                ? <E extends Event>(e: E) => customEventHandler(e, field)
                : field.onChange,
            }
          : onChange;

        const valueHandler = valueProp
          ? { [valueProp]: field.value }
          : { value };

        return (
          <FormItem className={cn(width === "half" ? "w-1/2" : "w-full")}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <FieldComponent
                {...fieldWithoutOnChangeAndValue}
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
