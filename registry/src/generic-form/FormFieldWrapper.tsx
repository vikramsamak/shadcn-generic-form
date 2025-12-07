import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { FieldValues } from 'react-hook-form';
import { FormFieldWrapperProps } from '@/types/FormFieldWrapper.types';
import { JSX } from 'react';

function FormFieldWrapper<T extends FieldValues>({
  formField,
  control,
}: FormFieldWrapperProps<T>): JSX.Element {
  const {
    name,
    label,
    render: renderField,
    width = 'full',
    description,
  } = formField;

  return (
    <FormField
      control={control}
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
