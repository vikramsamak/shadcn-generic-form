import { GenericFormProps } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z, ZodObject } from 'zod';
import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { JSX } from 'react';
import FormActions from './FormActions';
import FormFieldWrapper from './FormFieldWrapper';

const GRID_COLS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
};

const GAPS: Record<number, string> = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
  16: 'gap-16',
};

const getLayoutClassName = (
  layout: 'grid' | 'flex',
  columns?: number,
  gap?: number
) => {
  const colClass = GRID_COLS[columns || 2] || 'grid-cols-2';
  const gapClass = GAPS[gap || 4] || 'gap-4';

  return cn(
    layout === 'grid' ? 'grid' : 'flex flex-wrap',
    layout === 'grid' ? `${colClass} ${gapClass}` : gapClass
  );
};

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
            if (formField.condition && !formField.condition(values)) {
              return null;
            }

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
