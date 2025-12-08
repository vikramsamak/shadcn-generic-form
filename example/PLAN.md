# Playground Implementation Plan

## Goal

Completely renew the `example` application to create an interactive "Playground" for the `shadcn-generic-form` library. This playground will allow users to configure the form properties, layout, and fields dynamically, providing a real-time preview of the resulting form. The goal is to showcase the library's flexibility and ease of use to increase engagement and stars.

## UI Design

The playground will use a split-pane layout (responsive):

- **Left Panel (or Top on mobile):** Configuration & Settings.
- **Right Panel (or Bottom on mobile):** Live Preview & Code Snippet.

### Configuration Panel

This panel will be divided into tabs or sections:

1. **General Settings**:
    - **Layout Mode**: Radio group for `Grid` vs `Flex`.
    - **Columns**: Slider/Input for number of columns (grid mode).
    - **Gap**: Slider for gap size.
    - **Validation Mode**: Select (`onChange`, `onBlur`, `onSubmit`, etc.).
    - **Form Actions**: Inputs for "Submit Button Text", "Cancel Button Text".
    - **Toggles**: Show/Hide Cancel button, Disable form.

2. **Field Editor**:
    - **List of Fields**: Draggable (optional) or simple list of current fields.
    - **Add Field Tool**: Select field type (Text, Textarea, Select, Checkbox, Switch, Radio, Slider, DatePicker) and click "Add".
    - **Field Properties**: When a field is selected, show options:
        - Label
        - Name (Key)
        - Placeholder
        - Validation: "Required", "Min Length" (for text).
        - Options (for Select/Radio) - Allow adding comma-separated values.
    - **Delete Field**: Button to remove a field.

### Preview Panel

- **Live Form**: Renders the `GenericForm` component with the current derived configuration.
- **Output Log**: Simple console log display to show submitted values or errors.
- **Code Export**: A standard `CodeBlock` showing the JSX/JSON configuration to reproduce the current form.

## Tech Stack

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS + Shadcn UI (using existing components in `example/src/components/ui`).
- **Icons**: Lucide React.
- **State Management**: React `useState` / `useReducer` for the complex configuration object.

## Implementation Steps

### Phase 1: Setup & Structure

1. **Clean up `App.tsx`**: Remove presentational code and import the new `Playground` component.
2. **Create `Playground` Component Structure**:
    - `src/components/playground/Playground.tsx` (Main container)
    - `src/components/playground/ConfigPanel.tsx`
    - `src/components/playground/PreviewPanel.tsx`
    - `src/components/playground/FieldEditor.tsx`

### Phase 2: State Management

1. Define the `PlaygroundState` interface:
    - `layoutSettings`: { layout, columns, gap }
    - `formSettings`: { mode, disabled }
    - `actions`: { submitText, cancelText, showCancel }
    - `fields`: Array of field definitions (not the final specific `FormFieldConfig`, but a serializable representation).
2. Implement `usePlayground` hook or context to manage this state and actions (addField, updateField, removeField, updateSettings).

### Phase 3: Building Components

1. **Config Panel**:
    - Implement inputs for Global Settings using Shadcn components (Select, Input, Slider, Switch).
2. **Field Editor**:
    - Implement the list of fields.
    - Create a "Field Properties" form that updates the selected field's state.
3. **Preview Panel**:
    - Create a `configBuilder` utility that transforms the `PlaygroundState` into `GenericFormProps`.
        - **Dynamic Zod Schema**: Generate `z.object(...)` based on the field list.
        - **Dynamic Form Fields**: Map the serializable field list to `FormFieldConfig` array with proper `render` functions.
    - Render `<GenericForm ... />` with the generated props.

### Phase 4: Polish & Refinement

1. **Responsiveness**: Ensure side-by-side on desktop, stacked on mobile.
2. **Theming**: Ensure it looks premium (Shadcn compliant).
3. **Code Export**: Add the "Copy Code" feature.

## Directory Structure Changes

```text
example/src/
  components/
    playground/
      Playground.tsx
      ConfigPanel.tsx
      PreviewPanel.tsx
      FieldEditor.tsx
      utils.ts (for schema/config generation)
      types.ts
    ui/ (existing)
```
