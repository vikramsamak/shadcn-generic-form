import { useState } from 'react';
import { PlaygroundField } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FieldEditorProps {
  fields: PlaygroundField[];
  onAddField: (type: PlaygroundField['type']) => void;
  onUpdateField: (id: string, updates: Partial<PlaygroundField>) => void;
  onRemoveField: (id: string) => void;
}

const FIELD_TYPES: PlaygroundField['type'][] = [
  'text',
  'textarea',
  'select',
  'checkbox',
  'switch',
  'radio',
  'slider',
  'datePicker',
];

export default function FieldEditor({
  fields,
  onAddField,
  onUpdateField,
  onRemoveField,
}: FieldEditorProps) {
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [newFieldType, setNewFieldType] =
    useState<PlaygroundField['type']>('text');

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-4">Fields</h2>
        <div className="flex gap-2">
          <Select
            value={newFieldType}
            onValueChange={(val) =>
              setNewFieldType(val as PlaygroundField['type'])
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {FIELD_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => onAddField(newFieldType)} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 min-h-0 border-b relative">
          <ScrollArea className="h-full">
            <div className="p-2 space-y-1">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className={cn(
                    'flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted/50 transition-colors',
                    selectedFieldId === field.id && 'bg-muted'
                  )}
                  onClick={() => setSelectedFieldId(field.id)}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Settings2 className="h-3 w-3 text-muted-foreground shrink-0" />
                    <span className="text-sm font-medium truncate">
                      {field.label}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1 font-mono uppercase">
                      [{field.type}]
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10 hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveField(field.id);
                      if (selectedFieldId === field.id)
                        setSelectedFieldId(null);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              {fields.length === 0 && (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  No fields added. Add one above.
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {selectedField ? (
          <ScrollArea className="h-1/2 min-h-[250px] bg-muted/30">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">Properties</h3>
                <span className="text-xs text-muted-foreground font-mono">
                  {selectedField.id}
                </span>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs">Label</Label>
                  <Input
                    value={selectedField.label}
                    onChange={(e) =>
                      onUpdateField(selectedField.id, { label: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Name (Key)</Label>
                  <Input
                    value={selectedField.name}
                    onChange={(e) =>
                      onUpdateField(selectedField.id, { name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Placeholder</Label>
                  <Input
                    value={selectedField.placeholder || ''}
                    onChange={(e) =>
                      onUpdateField(selectedField.id, {
                        placeholder: e.target.value,
                      })
                    }
                    disabled={['checkbox', 'switch', 'slider'].includes(
                      selectedField.type
                    )}
                  />
                </div>

                <div className="flex items-center justify-between py-2">
                  <Label className="text-xs">Required</Label>
                  <Switch
                    checked={selectedField.required}
                    onCheckedChange={(checked) =>
                      onUpdateField(selectedField.id, { required: checked })
                    }
                  />
                </div>

                {['select', 'radio'].includes(selectedField.type) && (
                  <div className="space-y-2 pt-2 border-t">
                    <Label className="text-xs">Options (comma separated)</Label>
                    <Input
                      placeholder="Option 1, Option 2, ..."
                      value={
                        selectedField.options?.map((o) => o.label).join(', ') ||
                        ''
                      }
                      onChange={(e) => {
                        const values = e.target.value
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean);
                        const options = values.map((v) => ({
                          label: v,
                          value: v.toLowerCase().replace(/\s+/g, '_'),
                        }));
                        onUpdateField(selectedField.id, { options });
                      }}
                    />
                    <p className="text-[10px] text-muted-foreground">
                      Simple comma separation for now.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        ) : (
          <div className="h-1/2 min-h-[250px] flex items-center justify-center text-sm text-muted-foreground bg-muted/10 border-t">
            Select a field to edit properties
          </div>
        )}
      </div>
    </div>
  );
}
