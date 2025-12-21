import { useState } from 'react';
import { PlaygroundField } from './types';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { FieldsList } from './field-editor/FieldsList';
import { PropertyEditor } from './field-editor/PropertyEditor';

interface FieldEditorProps {
  fields: PlaygroundField[];
  onAddField: (type: PlaygroundField['type']) => void;
  onUpdateField: (id: string, updates: Partial<PlaygroundField>) => void;
  onRemoveField: (id: string) => void;
  onDuplicateField: (id: string) => void;
}

export default function FieldEditor({
  fields,
  onAddField,
  onUpdateField,
  onRemoveField,
  onDuplicateField,
}: FieldEditorProps) {
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [showPropertiesOnMobile, setShowPropertiesOnMobile] = useState(false);

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  const handleSelectField = (id: string) => {
    setSelectedFieldId(id);
    setShowPropertiesOnMobile(true);
  };

  const handleAddOption = () => {
    if (!selectedField) return;
    const currentOptions = selectedField.options || [];
    const newOption = {
      label: `Option ${currentOptions.length + 1}`,
      value: `option_${currentOptions.length + 1}`,
    };
    onUpdateField(selectedField.id, {
      options: [...currentOptions, newOption],
    });
  };

  const handleUpdateOption = (
    index: number,
    updates: { label: string; value: string }
  ) => {
    if (!selectedField || !selectedField.options) return;
    const newOptions = [...selectedField.options];
    newOptions[index] = updates;
    onUpdateField(selectedField.id, { options: newOptions });
  };

  const handleRemoveOption = (index: number) => {
    if (!selectedField || !selectedField.options) return;
    const newOptions = selectedField.options.filter((_, i) => i !== index);
    onUpdateField(selectedField.id, { options: newOptions });
  };

  return (
    <div className="flex flex-col h-full bg-background border-r">
      {/* Mobile Back Button */}
      {showPropertiesOnMobile && selectedField && (
        <div className="lg:hidden p-3 border-b flex items-center bg-muted/30">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPropertiesOnMobile(false)}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Fields
          </Button>
        </div>
      )}

      <div className="flex-1 flex flex-col min-h-0 bg-background">
        <FieldsList
          fields={fields}
          selectedFieldId={selectedFieldId}
          showPropertiesOnMobile={showPropertiesOnMobile}
          onAddField={onAddField}
          onSelectField={handleSelectField}
          onDuplicateField={onDuplicateField}
          onRemoveField={onRemoveField}
        />

        {selectedField && (
          <div className="hidden lg:block h-px bg-border shrink-0" />
        )}

        <PropertyEditor
          selectedField={selectedField}
          showPropertiesOnMobile={showPropertiesOnMobile}
          onUpdateField={onUpdateField}
          onAddOption={handleAddOption}
          onUpdateOption={handleUpdateOption}
          onRemoveOption={handleRemoveOption}
        />
      </div>
    </div>
  );
}
