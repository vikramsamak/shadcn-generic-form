# Generic Form

A highly flexible and customizable **Generic Form** component built with **ShadCN**, `react-hook-form`, and `Zod`. This component makes it easy to create dynamic forms with built-in validation, layout flexibility, and full control over form fields.

---

## ✨ Features

- **Dynamic Form Rendering** – Define form fields with a simple configuration array.
- **Validation with Zod** – Robust schema-based validation.
- **Fully Customizable UI** – Supports `flex` and `grid` layouts with configurable columns and gaps.
- **Conditional Fields** – Show or hide fields based on form values.
- **Adjustable Field Widths** – Configure widths (`full`, `half`, or custom classes).
- **Flexible Event Handling** – Hooks for `onSubmit`, `onError`, and `onCancel`.
- **Integrated Actions** – Built-in submit and cancel buttons with customization.

---

## 📦 Installation

To add the component to your project, run the following command:

```sh
npx shadcn@latest add https://shadcn-generic-form.vercel.app/generic-form.json
```

---

## ⚙️ Props

### `GenericFormProps<T>`

| Prop             | Type                        | Description                                                                              |
| ---------------- | --------------------------- | ---------------------------------------------------------------------------------------- |
| `formConfig`     | `FormConfig`                | Includes `formFields`, `validationSchema`, and `defaultValues`.                          |
| `formSettings`   | `FormSettings` (Optional)   | Configuration for validation mode (`mode`), `disabled` state, and `className`.           |
| `layoutSettings` | `LayoutSettings` (Optional) | Controls the layout structure (`layout`, `columns`, `gap`).                              |
| `actions`        | `FormActions`               | Event handlers (`onSubmit`, `onError`, `onCancel`) and customization for action buttons. |

#### Detailed Config Types

##### FormConfig

- `formFields`: `FormFieldConfig<z.input<T>>[]` - Array of field definitions.
- `validationSchema`: `T` - Zod schema for validation.
- `defaultValues`: `DefaultValues<z.input<T>>` - Initial values for the form.

##### FormSettings

- `mode`: `'onSubmit' | 'onBlur' | 'onChange' | 'onTouched' | 'all'` (Default: `'onSubmit'`)
- `disabled`: `boolean`
- `className`: `string`

##### LayoutSettings

- `layout`: `'flex' | 'grid'` (Default: `'flex'`)
- `columns`: `number` (For grid layout)
- `gap`: `number` (Gap size)

##### FormActions

- `onSubmit`: `(values: z.output<T>) => void`
- `onError`: `(errors: Record<string, unknown>) => void`
- `onCancel`: `() => void`
- `submitButtonText`: `string`
- `cancelButtonText`: `string`
- `submitBtnClassName`: `string`
- `cancelBtnClassName`: `string`

### `FormFieldConfig<T>`

| Prop          | Type                                                               | Description                                                         |
| ------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------- |
| `name`        | `Path<T>`                                                          | The name of the form field, matches Zod schema key.                 |
| `label`       | `string`                                                           | Display label for the field.                                        |
| `render`      | `(field: ControllerRenderProps<T, Path<T>>) => React.ReactElement` | Function returning the React element (Input, Select, etc.).         |
| `width`       | `'full' \| 'half' \| string`                                       | Width of the field container. Defaults to `'full'`.                 |
| `condition`   | `(values: T) => boolean`                                           | Function to conditionally render the field based on current values. |
| `description` | `string`                                                           | Helper text displayed below the field.                              |

---

## 🚀 Usage Example

```tsx
import { GenericForm } from '@/components/generic-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

// 1. Define Fields
const formFields = [
  {
    name: 'fullName',
    label: 'Full Name',
    // Optional: Add description, condition, or width
    description: 'Enter your full legal name',
    width: 'full', // or 'half'
    render: (field) => <Input {...field} placeholder="John Doe" />,
  },
  {
    name: 'email',
    label: 'Email Address',
    width: 'half',
    render: (field) => (
      <Input {...field} type="email" placeholder="john@example.com" />
    ),
  },
  {
    name: 'age',
    label: 'Age',
    width: 'half',
    render: (field) => <Input {...field} type="number" />,
  },
  {
    name: 'agreeToTerms',
    label: 'Agree to Terms',
    render: (field) => (
      <div className="flex items-center space-x-2">
        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
        <span>I agree to the terms and conditions</span>
      </div>
    ),
  },
  {
    name: 'ageRange',
    label: 'Select Age Range',
    // Conditional rendering example
    condition: (values) => values.age > 18,
    render: (field) => (
      <Slider
        onValueChange={field.onChange}
        value={field.value}
        max={100}
        step={1}
      />
    ),
  },
];

// 2. Define Default Values
const defaultValues = {
  fullName: '',
  email: '',
  age: 18,
  agreeToTerms: false,
  ageRange: [25],
};

// 3. Define Validation Schema
const validationSchema = z.object({
  fullName: z.string().min(2, 'Full Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.coerce.number().min(18, 'You must be at least 18'),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms.',
  }),
  ageRange: z.array(z.number()).min(1, 'Please select an age range'),
});

export default function App() {
  return (
    <GenericForm
      // 1. Form Configuration (Required)
      formConfig={{
        formFields,
        defaultValues,
        validationSchema,
      }}
      // 2. Form Settings (Optional)
      formSettings={{
        mode: 'onChange', // 'onSubmit' | 'onBlur' | 'onChange' | 'onTouched' | 'all'
        disabled: false, // Disable the entire form
        className: 'border p-6 rounded-lg shadow-sm', // Custom class for the form container
      }}
      // 3. Layout Settings (Optional)
      layoutSettings={{
        layout: 'grid', // 'flex' | 'grid'
        columns: 2, // Number of columns for grid layout
        gap: 4, // Spacing between fields (multiplied by 4px)
      }}
      // 4. Actions (Required)
      actions={{
        // Handlers
        onSubmit: (values) => console.log('Form submitted:', values),
        onError: (errors) => console.error('Form errors:', errors),
        onCancel: () => console.log('Form cancelled'),

        // Text Customization
        submitButtonText: 'Register',
        cancelButtonText: 'Cancel',

        // Styling
        submitBtnClassName: 'w-full md:w-auto',
        cancelBtnClassName:
          'w-full md:w-auto border-destructive text-destructive hover:bg-destructive/10',
      }}
    />
  );
}
```

---

## 🛠️ Development

1. **Clone the repository:**

   ```sh
   git clone https://github.com/vikramsamak/generic-form.git
   cd generic-form
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the playground:**

   ```sh
   npm run dev
   ```

---

## 🤝 Contributing

PRs are welcome! Please follow the contribution guidelines.

---

### 🚀 Built with ❤️ using **ShadCN, React Hook Form & Zod**
