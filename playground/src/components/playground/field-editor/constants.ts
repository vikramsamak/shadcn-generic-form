import {
  Type,
  AlignLeft,
  CheckSquare,
  ToggleLeft,
  List,
  Sliders,
  Calendar,
  MousePointer2,
} from 'lucide-react';

export const FIELD_TYPES = [
  { type: 'text' as const, icon: Type, label: 'Text Input' },
  { type: 'textarea' as const, icon: AlignLeft, label: 'Textarea' },
  { type: 'select' as const, icon: MousePointer2, label: 'Select' },
  { type: 'checkbox' as const, icon: CheckSquare, label: 'Checkbox' },
  { type: 'switch' as const, icon: ToggleLeft, label: 'Switch' },
  { type: 'radio' as const, icon: List, label: 'Radio Group' },
  { type: 'slider' as const, icon: Sliders, label: 'Slider' },
  { type: 'datePicker' as const, icon: Calendar, label: 'Date Picker' },
];
