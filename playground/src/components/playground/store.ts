import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  PlaygroundField,
  LayoutSettings,
  FormSettings,
  FormActionsSettings,
  PlaygroundState,
} from './types';
import { generateId } from './utils';

interface PlaygroundStore extends PlaygroundState {
  // UI State
  selectedFieldId: string | null;
  showProperties: boolean;
  newFieldType: PlaygroundField['type'];

  // Actions - Settings
  updateLayoutSettings: (settings: Partial<LayoutSettings>) => void;
  updateFormSettings: (settings: Partial<FormSettings>) => void;
  updateActions: (settings: Partial<FormActionsSettings>) => void;

  // Actions - Fields
  addField: (type: PlaygroundField['type']) => void;
  updateField: (id: string, updates: Partial<PlaygroundField>) => void;
  removeField: (id: string) => void;
  duplicateField: (id: string) => void;

  // Actions - UI
  setSelectedFieldId: (id: string | null) => void;
  setShowProperties: (show: boolean) => void;
  setNewFieldType: (type: PlaygroundField['type']) => void;
  selectField: (id: string) => void;

  // Actions - Options
  addOption: (fieldId: string) => void;
  updateOption: (
    fieldId: string,
    index: number,
    updates: { label: string; value: string }
  ) => void;
  removeOption: (fieldId: string, index: number) => void;
}

const initialState: PlaygroundState = {
  layoutSettings: {
    layout: 'grid',
    columns: 2,
    gap: 4,
  },
  formSettings: {
    mode: 'onChange',
    disabled: false,
  },
  actions: {
    submitButtonText: 'Submit',
    cancelButtonText: 'Cancel',
    showCancel: true,
  },
  fields: [
    {
      id: '1',
      name: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'Enter username',
      required: true,
    },
    {
      id: '2',
      name: 'email',
      label: 'Email',
      type: 'text',
      placeholder: 'Enter email',
      required: true,
    },
  ],
};

export const usePlaygroundStore = create<PlaygroundStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      selectedFieldId: null,
      showProperties: false,
      newFieldType: 'text',

      updateLayoutSettings: (settings) =>
        set((state) => ({
          layoutSettings: { ...state.layoutSettings, ...settings },
        })),

      updateFormSettings: (settings) =>
        set((state) => ({
          formSettings: { ...state.formSettings, ...settings },
        })),

      updateActions: (settings) =>
        set((state) => ({
          actions: { ...state.actions, ...settings },
        })),

      addField: (type) => {
        const newField: PlaygroundField = {
          id: generateId(),
          name: `field_${generateId()}`,
          label: 'New Field',
          type,
          placeholder: '',
          required: false,
        };
        set((state) => ({
          fields: [...state.fields, newField],
        }));
      },

      updateField: (id, updates) =>
        set((state) => ({
          fields: state.fields.map((field) =>
            field.id === id ? { ...field, ...updates } : field
          ),
        })),

      removeField: (id) =>
        set((state) => {
          const isSelected = state.selectedFieldId === id;
          return {
            fields: state.fields.filter((field) => field.id !== id),
            selectedFieldId: isSelected ? null : state.selectedFieldId,
            showProperties: isSelected ? false : state.showProperties,
          };
        }),

      duplicateField: (id) =>
        set((state) => {
          const fieldIndex = state.fields.findIndex((f) => f.id === id);
          if (fieldIndex === -1) return state;
          const field = state.fields[fieldIndex];
          const newField = {
            ...field,
            id: generateId(),
            name: `${field.name}_copy`,
            label: `${field.label} (Copy)`,
          };
          const newFields = [...state.fields];
          newFields.splice(fieldIndex + 1, 0, newField);
          return { fields: newFields };
        }),

      setSelectedFieldId: (id) => set({ selectedFieldId: id }),
      setShowProperties: (show) => set({ showProperties: show }),
      setNewFieldType: (type) => set({ newFieldType: type }),
      selectField: (id) => set({ selectedFieldId: id, showProperties: true }),

      addOption: (fieldId) => {
        const field = get().fields.find((f) => f.id === fieldId);
        if (!field) return;
        const currentOptions = field.options || [];
        const newOption = {
          label: `Option ${currentOptions.length + 1}`,
          value: `option_${currentOptions.length + 1}`,
        };
        get().updateField(fieldId, { options: [...currentOptions, newOption] });
      },

      updateOption: (fieldId, index, updates) => {
        const field = get().fields.find((f) => f.id === fieldId);
        if (!field || !field.options) return;
        const newOptions = [...field.options];
        newOptions[index] = updates;
        get().updateField(fieldId, { options: newOptions });
      },

      removeOption: (fieldId, index) => {
        const field = get().fields.find((f) => f.id === fieldId);
        if (!field || !field.options) return;
        const newOptions = field.options.filter((_, i) => i !== index);
        get().updateField(fieldId, { options: newOptions });
      },
    }),
    {
      name: 'playground-storage',
      // Only persist the non-UI state
      partialize: (state) => ({
        layoutSettings: state.layoutSettings,
        formSettings: state.formSettings,
        actions: state.actions,
        fields: state.fields,
      }),
    }
  )
);
