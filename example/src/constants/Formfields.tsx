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
    component: Input,
    props: { type: "text", placeholder: "Enter text" },
    eventProp: "onChange",
    valueProp: "value",
  },
  {
    name: "textarea",
    label: "Textarea",
    component: Textarea,
    props: { placeholder: "Enter details" },
    eventProp: "onChange",
    valueProp: "value",
  },
  {
    name: "select",
    label: "Select",
    component: Select,
    props: {
      children: (
        <>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </>
      ),
    },
    eventProp: "onValueChange",
    valueProp: "value",
  },
  {
    name: "checkbox",
    label: "Checkbox",
    component: Checkbox,
    eventProp: "onCheckedChange",
    valueProp: "checked",
  },
  {
    name: "switch",
    label: "Switch",
    component: Switch,
    eventProp: "onCheckedChange",
    valueProp: "checked",
  },
  {
    name: "radio",
    label: "Radio Group",
    component: RadioGroup,
    props: {
      children: (
        <>
          <RadioGroupItem value="option1" id="option1" />
          <label htmlFor="option1">Option 1</label>
          <RadioGroupItem value="option2" id="option2" />
          <label htmlFor="option2">Option 2</label>
        </>
      ),
    },
    eventProp: "onValueChange",
    valueProp: "value",
  },
  {
    name: "slider",
    label: "Slider",
    component: Slider,
    props: { defaultValue: [33], max: 100, step: 1 },
    eventProp: "onValueChange",
    valueProp: "value",
  },
  {
    name: "datePicker",
    label: "Date Picker",
    component: DatePicker,
    eventProp: "onSelect",
    valueProp: "selected",
  },
];
