/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlaygroundState } from './types';
import { FormFieldConfig } from '@/types/FormField.types';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { DatePicker } from '@/components/ui/date-picker';
import { Label } from '@/components/ui/label';
import { ControllerRenderProps } from 'react-hook-form';

export const generateId = () => Math.random().toString(36).substr(2, 9);

export function buildFormProps(state: PlaygroundState) {
  const { fields, layoutSettings, formSettings, actions } = state;

  const defaultValues: Record<string, any> = {};
  const validationSchemaShape: Record<string, any> = {};
  const formFields: FormFieldConfig<any>[] = [];

  fields.forEach((field) => {
    // 1. Default Values
    if (field.type === 'checkbox' || field.type === 'switch') {
      defaultValues[field.name] = false;
    } else if (field.type === 'slider') {
      defaultValues[field.name] = [0];
    } else if (field.type === 'datePicker') {
      defaultValues[field.name] = null; // or new Date()
    } else {
      defaultValues[field.name] = '';
    }

    // 2. Validation Schema
    let fieldSchema;
    switch (field.type) {
      case 'text':
      case 'textarea':
      case 'select':
      case 'radio':
        fieldSchema = z.string();
        if (field.required) {
          fieldSchema = (fieldSchema as z.ZodString).min(
            1,
            `${field.label} is required`
          );
        } else {
          fieldSchema = fieldSchema.optional();
        }
        break;
      case 'checkbox':
      case 'switch':
        fieldSchema = z.boolean();
        if (field.required) {
          fieldSchema = fieldSchema.refine((val) => val === true, {
            message: `${field.label} is required`,
          });
        }
        break;
      case 'slider':
        fieldSchema = z.array(z.number());
        if (field.required) {
          fieldSchema = fieldSchema.nonempty(`${field.label} is required`);
        }
        break;
      case 'datePicker':
        fieldSchema = z.date();
        if (!field.required) {
          fieldSchema = fieldSchema.optional().nullable();
        }
        break;
      default:
        fieldSchema = z.any();
    }
    validationSchemaShape[field.name] = fieldSchema;

    // 3. Form Field Config
    formFields.push({
      name: field.name,
      label: field.label,
      render: (props: ControllerRenderProps<any, any>) => {
        switch (field.type) {
          case 'text':
            return <Input {...props} placeholder={field.placeholder} />;
          case 'textarea':
            return <Textarea {...props} placeholder={field.placeholder} />;
          case 'select':
            return (
              <Select onValueChange={props.onChange} defaultValue={props.value}>
                <SelectTrigger>
                  <SelectValue placeholder={field.placeholder || 'Select...'} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  )) || <SelectItem value="default">Default Option</SelectItem>}
                </SelectContent>
              </Select>
            );
          case 'checkbox':
            return (
              <Checkbox
                checked={props.value}
                onCheckedChange={props.onChange}
              />
            );
          case 'switch':
            return (
              <Switch checked={props.value} onCheckedChange={props.onChange} />
            );
          case 'radio':
            return (
              <RadioGroup
                onValueChange={props.onChange}
                defaultValue={props.value}
                className="flex flex-col space-y-1"
              >
                {field.options?.map((opt) => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={opt.value}
                      id={`${field.id}-${opt.value}`}
                    />
                    <Label htmlFor={`${field.id}-${opt.value}`}>
                      {opt.label}
                    </Label>
                  </div>
                )) || (
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option1" id={`${field.id}-opt1`} />
                    <Label htmlFor={`${field.id}-opt1`}>Option 1</Label>
                  </div>
                )}
              </RadioGroup>
            );
          case 'slider':
            return (
              <Slider
                onValueChange={props.onChange}
                defaultValue={props.value}
                max={100}
                step={1}
              />
            );
          case 'datePicker':
            return (
              <DatePicker selected={props.value} onSelect={props.onChange} />
            );
          default:
            return <Input {...props} />;
        }
      },
    });
  });

  return {
    formConfig: {
      formFields,
      validationSchema: z.object(validationSchemaShape),
      defaultValues,
    },
    formSettings: {
      mode: formSettings.mode,
      disabled: formSettings.disabled,
    },
    layoutSettings,
    actions: {
      ...actions,
      onSubmit: (values: any) => console.log('Form Submitted:', values),
      ...(actions.showCancel
        ? { onCancel: () => console.log('Form Cancelled') }
        : {}),
    },
  };
}
