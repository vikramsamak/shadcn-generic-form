import { FormFieldConfig, GenericFormProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, DefaultValues, FieldValues, useForm } from "react-hook-form";
import { TypeOf } from "zod";
import { Form } from "./ui/form";
import { cn } from "@/lib/utils";
import FormFieldWrapper from "./FormFieldWrapper";
import FormActions from "./FormActions";

function GenericForm<T extends FieldValues>({
  formConfig,
  formSettings,
  layoutSettings,
  actions,
}: GenericFormProps<T>) {
  const { formFields, validationSchema, defaultValues } = formConfig;

  const {
    submitButtonText = "Submit",
    cancelButtonText,
    onSubmit,
    onError,
    onCancel,
  } = actions;

  const { layout = "flex", columns, gap } = layoutSettings ?? {};

  const { mode = "onSubmit", disabled, className } = formSettings ?? {};

  type FormSchema = TypeOf<typeof validationSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: defaultValues as DefaultValues<FormSchema>,
    mode,
  });

  const values = form.watch();

  function getLayoutClassName(
    layout: "grid" | "flex",
    columns?: number,
    gap?: number
  ) {
    return cn(
      layout === "grid" ? "grid" : "flex flex-wrap",
      layout === "grid"
        ? `grid-cols-${columns || 2} gap-${gap || 4}`
        : `gap-${gap || 4}`
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className={cn("space-y-4", className)}
      >
        <div className={getLayoutClassName(layout, columns, gap)}>
          {formFields.map((formField) => {
            if (formField.condition && !formField.condition(values as T))
              return null;

            return (
              <FormFieldWrapper<FormSchema>
                key={formField.name}
                formField={formField as unknown as FormFieldConfig<FormSchema>}
                control={form.control as Control<FormSchema>}
              />
            );
          })}
        </div>
        <FormActions
          submitButtonText={submitButtonText}
          cancelButtonText={cancelButtonText}
          disabled={disabled}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}

export default GenericForm;
