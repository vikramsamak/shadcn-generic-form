/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { DatePicker } from "@/components/ui/date-picker";
import { FormFieldConfig } from "@/types";

export const FORM_FIELDS: FormFieldConfig<any, any>[] = [
  {
    name: "text",
    label: "Text Input",
    render: (field) => <Input {...field} type="text" placeholder="Enter text" />,
  },
  {
    name: "textarea",
    label: "Textarea",
    render: (field) => <Textarea {...field} placeholder="Enter details" />,
  },
  {
    name: "select",
    label: "Select",
    render: (field) => (
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
  {
    name: "checkbox",
    label: "Checkbox",
    render: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
  {
    name: "toggle",
    label: "Toggle",
    render: (field) => (
      <Switch checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
  {
    name: "radio",
    label: "Radio Group",
    render: (field) => (
      <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
        <span className="flex items-center gap-2">
          <RadioGroupItem value="option1" id="option1" />
          <label htmlFor="option1">Option 1</label>
        </span>
        <span className="flex items-center gap-2">
          <RadioGroupItem value="option2" id="option2" />
          <label htmlFor="option2">Option 2</label>
        </span>
      </RadioGroup>
    ),
  },
  {
    name: "slider",
    label: "Slider",
    render: (field) => (
      <Slider
        defaultValue={[33]}
        max={100}
        step={1}
        onValueChange={field.onChange}
        value={field.value}
      />
    ),
  },
  {
    name: "datePicker",
    label: "Date Picker",
    render: (field) => <DatePicker onSelect={field.onChange} selected={field.value} />,
  },
];
