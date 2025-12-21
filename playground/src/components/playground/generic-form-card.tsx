import { GenericForm } from '../generic-form';
import { FORM_FIELDS } from '../../constants/form-fields';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { z } from 'zod';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

function GenericFormCard() {
  const defaultValues = {
    text: '',
    textarea: '',
    select: '',
    checkbox: false,
    switch: false,
    radio: 'option1',
    slider: [1],
    datePicker: new Date(),
  };

  const validationSchema = z.object({
    text: z.string().min(2, 'Invalid input'),
    textarea: z.string().min(5, 'Invalid input'),
    select: z.string().min(1, 'Selection required'),
    checkbox: z.boolean().refine((val) => val === true, {
      message: 'This field is required',
    }),
    toggle: z.boolean().refine((val) => val === true, {
      message: 'This field is required',
    }),
    radio: z.string().min(1, 'Selection required'),
    slider: z
      .array(z.number().min(1, 'Invalid value').positive('Invalid value'))
      .nonempty('This field is required'),
    datePicker: z.union([z.string(), z.date()]).refine(
      (value) => {
        const date = value instanceof Date ? value : new Date(value);
        return !isNaN(date.getTime()) && date >= new Date();
      },
      {
        message: 'Invalid date',
      }
    ),
  });

  return (
    <Card className="w-full shadow-lg rounded-2xl">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md overflow-hidden border">
            <img
              src="/logo.svg"
              alt="Generic Form Logo"
              className="w-full h-full"
            />
          </div>
          <CardTitle className="text-xl font-semibold">Generic Form</CardTitle>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          Fill out the details below and submit the form.
        </CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 px-6 py-4">
          <GenericForm
            formConfig={{
              formFields: FORM_FIELDS,
              defaultValues,
              validationSchema,
            }}
            formSettings={{
              mode: 'onChange',
            }}
            actions={{
              onSubmit: (values) => console.log(values),
              onError: (errors) => console.log(errors),
              submitButtonText: 'Submit',
            }}
          />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default GenericFormCard;
