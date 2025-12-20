import { GenericFormProps } from '@/types/GenericForm.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, DefaultValues } from 'react-hook-form';
import { z, ZodObject } from 'zod';
import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { JSX } from 'react';
import { getLayoutClassName } from './utils';
import FormActions from './FormActions';
import FormFieldWrapper from './FormFieldWrapper';

function GenericForm<T extends ZodObject<{ [key: string]: z.ZodTypeAny }>>({
  formConfig,
  formSettings,
  layoutSettings,
  actions,
}: GenericFormProps<T>): JSX.Element {
  const { formFields, validationSchema, defaultValues } = formConfig;
  const { layout = 'flex', columns, gap } = layoutSettings ?? {};
  const { mode = 'onSubmit', disabled, className } = formSettings ?? {};
  const {
    submitButtonText = 'Submit',
    cancelButtonText,
    onSubmit,
    onError,
    onCancel,
    cancelBtnClassName,
    submitBtnClassName,
  } = actions;

  const form = useForm<z.input<T>, any, z.output<T>>({
    resolver: zodResolver(validationSchema),
    defaultValues: defaultValues as DefaultValues<z.input<T>>,
    mode,
    disabled,
  });

  const values = form.watch();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className={cn('space-y-4', className)}
      >
        <div className={getLayoutClassName(layout, columns, gap)}>
          {formFields.map((formField) => {
            if (formField.condition && !formField.condition(values))
              return null;

            return (
              <FormFieldWrapper<z.input<T>>
                key={formField.name}
                formField={formField}
              />
            );
          })}
        </div>
        <FormActions
          submitButtonText={submitButtonText}
          cancelButtonText={cancelButtonText}
          submitBtnClassName={submitBtnClassName}
          cancelBtnClassName={cancelBtnClassName}
          disabled={disabled}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}

export default GenericForm;
