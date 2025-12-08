import { useState, useCallback } from 'react';
import { PlaygroundField, PlaygroundState, LayoutSettings, FormSettings, FormActionsSettings } from './types';
import { generateId } from './utils';

const DEFAULT_STATE: PlaygroundState = {
    layoutSettings: {
        layout: 'flex',
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
            id: generateId(),
            name: 'username',
            label: 'Username',
            type: 'text',
            placeholder: 'Enter username',
            required: true,
        },
        {
            id: generateId(),
            name: 'email',
            label: 'Email',
            type: 'text',
            placeholder: 'Enter email',
            required: true,
        },
    ],
};

export function usePlayground() {
    const [state, setState] = useState<PlaygroundState>(DEFAULT_STATE);

    const updateLayoutSettings = useCallback((settings: Partial<LayoutSettings>) => {
        setState((prev) => ({
            ...prev,
            layoutSettings: { ...prev.layoutSettings, ...settings },
        }));
    }, []);

    const updateFormSettings = useCallback((settings: Partial<FormSettings>) => {
        setState((prev) => ({
            ...prev,
            formSettings: { ...prev.formSettings, ...settings },
        }));
    }, []);

    const updateActions = useCallback((settings: Partial<FormActionsSettings>) => {
        setState((prev) => ({
            ...prev,
            actions: { ...prev.actions, ...settings },
        }));
    }, []);

    const addField = useCallback((type: PlaygroundField['type']) => {
        const newField: PlaygroundField = {
            id: generateId(),
            name: `field_${generateId()}`,
            label: 'New Field',
            type,
            placeholder: '',
            required: false,
        };
        setState((prev) => ({
            ...prev,
            fields: [...prev.fields, newField],
        }));
    }, []);

    const updateField = useCallback((id: string, updates: Partial<PlaygroundField>) => {
        setState((prev) => ({
            ...prev,
            fields: prev.fields.map((field) =>
                field.id === id ? { ...field, ...updates } : field
            ),
        }));
    }, []);

    const removeField = useCallback((id: string) => {
        setState((prev) => ({
            ...prev,
            fields: prev.fields.filter((field) => field.id !== id),
        }));
    }, []);

    return {
        state,
        updateLayoutSettings,
        updateFormSettings,
        updateActions,
        addField,
        updateField,
        removeField,
    };
}
