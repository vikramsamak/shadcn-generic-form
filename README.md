# Generic Form

A highly flexible and customizable **Generic Form** component built with **ShadCN**, `react-hook-form`, and `Zod`. This component makes it easy to create dynamic forms with built-in validation, layout flexibility, and full control over form fields.

---

## ✨ Features

- **Dynamic Form Rendering** – Define form fields with configuration.
- **Validation with Zod** – Schema-based validation for robust form handling.
- **Fully Customizable UI** – Supports `flex` and `grid` layouts.
- **Adjustable Field Widths** – Configure widths for each field (`full`, `half`, custom).
- **Flexible Event Handling** – Pass event handlers and custom event props.
- **Integrated Submit & Reset Actions** – Handle form submission effortlessly.

---

## 📦 Installation

```sh
npx shadcn@latest add https://shadcn-generic-form.vercel.app/generic-form.json
```

---

## ⚙️ Props

### `GenericFormProps<T>`

| Prop              | Type                                                                 | Description |
|------------------|--------------------------------------------------------------------|-------------|
| `formConfig`     | `{ formFields: FormFieldConfig<z.input<T>>[]; validationSchema: T; defaultValues: DefaultValues<z.input<T>>; }` | Configuration for form fields, validation schema, and default values. |
| `formSettings`   | `{ mode?: 'onSubmit' \| 'onBlur' \| 'onChange' \| 'onTouched' \| 'all'; disabled?: boolean; className?: string; }` | Settings for form behavior and appearance. |
| `layoutSettings` | `{ layout?: 'flex' \| 'grid'; columns?: number; gap?: number; }` | Controls the layout structure of the form. |
| `actions`        | `{ submitButtonText?: string; cancelButtonText?: string; submitBtnClassName?: string; cancelBtnClassName?: string; onSubmit: (values: z.output<T>) => void; onError?: (errors: Record<string, unknown>) => void; onCancel?: () => void; }` | Event handlers and customization for form actions. |

### `FormFieldConfig<T>`

| Prop           | Type                                         | Description |
|----------------|----------------------------------------------|-------------|
| `name`         | `Path<T>`                                   | The name of the form field, used for binding with React Hook Form. |
| `label`        | `string`                                    | The label displayed for the field. |
| `render`       | `(field: ControllerRenderProps<T, Path<T>>) => React.ReactElement` | A function that returns a React element to render for the field. |
| `width`        | `'full' \| 'half' \| string`                | Defines the width of the form field. Defaults to `'full'`. |
| `condition`    | `(values: T) => boolean`                     | A function that determines if the field should be displayed. |
| `description`  | `string`                                    | Additional description or hint text for the field. |

## 🚀 Usage Example

```tsx
import { GenericForm } from './components/generic-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

const formFields = [
  {
    name: 'fullName',
    label: 'Full Name',
    render: (field) => <Input {...field} />,
  },
  {
    name: 'agreeToTerms',
    label: 'Agree to Terms',
    render: (field) => <Checkbox checked={field.value} onCheckedChange={field.onChange} />,
  },
  {
    name: 'ageRange',
    label: 'Select Age Range',
    render: (field) => <Slider onValueChange={field.onChange} value={field.value} />,
  },
];

const defaultValues = {
  fullName: '',
  agreeToTerms: false,
  ageRange: [25],
};

const validationSchema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms.',
  }),
  ageRange: z.array(z.number()).min(1, 'Please select an age range'),
});

export default function App() {
  return (
    <GenericForm
      formConfig={{ formFields, defaultValues, validationSchema }}
      actions={{ onSubmit: (values) => console.log(values) }}
    />
  );
}
```

## 🛠️ Development

1. Clone the repository:

   ```sh
   git clone https://github.com/vikramsamak/generic-form.git
   cd generic-form
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the dev server:

   ```sh
   npm run dev
   ```

---

## 🤝 Contributing

PRs are welcome! Please follow the contribution guidelines.

---

### 🚀 Built with ❤️ using **ShadCN, React Hook Form & Zod**
