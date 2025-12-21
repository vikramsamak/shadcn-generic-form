import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { FieldValues, Path } from 'react-hook-form';
import { FormFieldWrapperProps } from '@/types/form-field-wrapper.types';
import { JSX } from 'react';

function FormFieldWrapper<T extends FieldValues>({
  formField,
}: FormFieldWrapperProps<T>): JSX.Element {
  const {
    name,
    label,
    render: renderField,
    width = 'full',
    description,
  } = formField;

  return (
    <FormField<T, Path<T>>
      name={name}
      render={({ field }) => (
        <FormItem className={cn(width === 'half' ? 'w-1/2' : 'w-full')}>
          <FormLabel>{label}</FormLabel>
          <FormControl>{renderField(field)}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormFieldWrapper;
