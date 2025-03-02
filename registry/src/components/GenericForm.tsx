import { GenericFormProps } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z, ZodObject } from 'zod';
import { Form } from './ui/form';
import { cn } from '@/lib/utils';
import { JSX } from 'react';
import FormActions from './FormActions';
import FormFieldWrapper from './FormFieldWrapper';

const getLayoutClassName = (
  layout: 'grid' | 'flex',
  columns?: number,
  gap?: number
) =>
  cn(
    layout === 'grid' ? 'grid' : 'flex flex-wrap',
    layout === 'grid'
      ? `grid-cols-${columns || 2} gap-${gap || 4}`
      : `gap-${gap || 4}`
  );

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

  type FormSchema = z.infer<T>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: defaultValues,
    mode,
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
              <FormFieldWrapper<FormSchema>
                key={formField.name}
                formField={formField}
                control={form.control}
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
