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
import { Separator } from '@/components/ui/separator';
import {
  Plus,
  Trash2,
  Settings2,
  Copy,
  ChevronLeft,
  Type,
  AlignLeft,
  CheckSquare,
  ToggleLeft,
  List,
  Sliders,
  Calendar,
  MousePointer2,
  MoreVertical,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FieldEditorProps {
  fields: PlaygroundField[];
  onAddField: (type: PlaygroundField['type']) => void;
  onUpdateField: (id: string, updates: Partial<PlaygroundField>) => void;
  onRemoveField: (id: string) => void;
  onDuplicateField: (id: string) => void;
}

const FIELD_TYPES = [
  { type: 'text' as const, icon: Type, label: 'Text Input' },
  { type: 'textarea' as const, icon: AlignLeft, label: 'Textarea' },
  { type: 'select' as const, icon: MousePointer2, label: 'Select' },
  { type: 'checkbox' as const, icon: CheckSquare, label: 'Checkbox' },
  { type: 'switch' as const, icon: ToggleLeft, label: 'Switch' },
  { type: 'radio' as const, icon: List, label: 'Radio Group' },
  { type: 'slider' as const, icon: Sliders, label: 'Slider' },
  { type: 'datePicker' as const, icon: Calendar, label: 'Date Picker' },
];

export default function FieldEditor({
  fields,
  onAddField,
  onUpdateField,
  onRemoveField,
  onDuplicateField,
}: FieldEditorProps) {
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [showPropertiesOnMobile, setShowPropertiesOnMobile] = useState(false);
  const [newFieldType, setNewFieldType] =
    useState<PlaygroundField['type']>('text');

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  const handleSelectField = (id: string) => {
    setSelectedFieldId(id);
    setShowPropertiesOnMobile(true);
  };

  const getTypeIcon = (type: string) => {
    const fieldType = FIELD_TYPES.find((f) => f.type === type);
    return fieldType ? fieldType.icon : Type;
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
      {/* Mobile Back Button (only visible when properties are shown on mobile) */}
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
        {/* Fields List Panel */}
        <div
          className={cn(
            'flex flex-col min-h-0 shrink-0',
            // On desktop: take 45% height (adjust as needed), or just flex-1
            'lg:flex-1 lg:h-[45%]',
            // On mobile: take full height if active, else hide
            showPropertiesOnMobile ? 'hidden lg:flex' : 'flex-1'
          )}
        >
          <div className="p-4 border-b bg-background/50 shrink-0">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Form Fields
            </h2>
            <div className="flex gap-2">
              <Select
                value={newFieldType}
                onValueChange={(val) =>
                  setNewFieldType(val as PlaygroundField['type'])
                }
              >
                <SelectTrigger className="w-full h-9">
                  <SelectValue placeholder="Add field..." />
                </SelectTrigger>
                <SelectContent>
                  {FIELD_TYPES.map(({ type, icon: Icon, label }) => (
                    <SelectItem key={type} value={type}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={() => onAddField(newFieldType)}
                size="icon"
                className="h-9 w-9"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-hidden bg-background">
            <ScrollArea className="h-full">
              <div className="p-3 space-y-2 pb-10">
                {fields.map((field) => {
                  const Icon = getTypeIcon(field.type);
                  const isSelected = selectedFieldId === field.id;
                  return (
                    <div
                      key={field.id}
                      className={cn(
                        'group flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all',
                        isSelected
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'border-border hover:border-primary/30 hover:bg-muted/30'
                      )}
                      onClick={() => handleSelectField(field.id)}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div
                          className={cn(
                            'p-2 rounded-md border transition-colors',
                            isSelected
                              ? 'bg-primary/10 border-primary/20'
                              : 'bg-muted/50'
                          )}
                        >
                          <Icon
                            className={cn(
                              'h-4 w-4',
                              isSelected
                                ? 'text-primary'
                                : 'text-muted-foreground'
                            )}
                          />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-sm font-medium truncate">
                            {field.label}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-mono uppercase">
                            {field.name} • {field.type}
                          </span>
                        </div>
                      </div>

                      <div
                        className={cn(
                          'flex items-center gap-1',
                          isSelected
                            ? 'opacity-100'
                            : 'lg:opacity-0 lg:group-hover:opacity-100 transition-opacity'
                        )}
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            asChild
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => onDuplicateField(field.id)}
                            >
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive font-medium"
                              onClick={() => {
                                onRemoveField(field.id);
                                if (selectedFieldId === field.id)
                                  setSelectedFieldId(null);
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  );
                })}
                {fields.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <div className="p-3 rounded-full bg-muted/30 mb-3">
                      <Settings2 className="h-8 w-8 opacity-20" />
                    </div>
                    <p className="text-sm font-medium">No fields added yet</p>
                    <p className="text-xs">
                      Use the selector above to add fields.
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Separator / Header for Properties on Desktop */}
        {selectedField && (
          <div className="hidden lg:block h-px bg-border shrink-0" />
        )}

        {/* Property Editor Panel */}
        <div
          className={cn(
            'flex flex-col min-h-0 bg-muted/5',
            // On desktop: take remaining height
            'lg:flex-1 lg:h-[55%]',
            // On mobile: take full height if active, else hide
            !showPropertiesOnMobile ? 'hidden lg:flex' : 'flex-1'
          )}
        >
          {selectedField ? (
            <div className="flex flex-col h-full overflow-hidden">
              <div className="p-4 border-b bg-background shrink-0 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">Field Properties</h3>
                  <p className="text-[10px] font-mono text-muted-foreground uppercase">
                    ID: {selectedField.id}
                  </p>
                </div>
              </div>

              <div className="flex-1 min-h-0 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-6 pb-12 lg:pb-6">
                    {/* Basic Group */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">
                        Basic Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs">Label</Label>
                          <Input
                            value={selectedField.label}
                            onChange={(e) =>
                              onUpdateField(selectedField.id, {
                                label: e.target.value,
                              })
                            }
                            className="h-9"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Field Key (Name)</Label>
                          <Input
                            value={selectedField.name}
                            onChange={(e) =>
                              onUpdateField(selectedField.id, {
                                name: e.target.value,
                              })
                            }
                            className="h-9 font-mono"
                          />
                        </div>
                      </div>
                      {!['checkbox', 'switch', 'slider', 'datePicker'].includes(
                        selectedField.type
                      ) && (
                        <div className="space-y-2">
                          <Label className="text-xs">Placeholder Text</Label>
                          <Input
                            value={selectedField.placeholder || ''}
                            onChange={(e) =>
                              onUpdateField(selectedField.id, {
                                placeholder: e.target.value,
                              })
                            }
                            className="h-9"
                          />
                        </div>
                      )}
                    </div>

                    <Separator className="opacity-50" />

                    {/* Interaction Group */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">
                        Interaction & Validation
                      </h4>
                      <div className="flex items-center justify-between p-3 rounded-lg border bg-background/50">
                        <div className="space-y-0.5">
                          <Label className="text-sm">Required Field</Label>
                          <p className="text-xs text-muted-foreground">
                            User must provide a value
                          </p>
                        </div>
                        <Switch
                          checked={selectedField.required}
                          onCheckedChange={(checked) =>
                            onUpdateField(selectedField.id, {
                              required: checked,
                            })
                          }
                        />
                      </div>
                    </div>

                    {/* Options Group for Select/Radio */}
                    {['select', 'radio'].includes(selectedField.type) && (
                      <>
                        <Separator className="opacity-50" />
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                              Options
                            </h4>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleAddOption}
                              className="h-7 text-[10px] px-2"
                            >
                              <Plus className="h-3 w-3 mr-1" /> Add Option
                            </Button>
                          </div>

                          <div className="space-y-2">
                            {selectedField.options?.map((option, index) => (
                              <div
                                key={index}
                                className="flex gap-2 items-center bg-background border p-2 rounded-md shadow-sm"
                              >
                                <Input
                                  value={option.label}
                                  onChange={(e) =>
                                    handleUpdateOption(index, {
                                      ...option,
                                      label: e.target.value,
                                    })
                                  }
                                  placeholder="Label"
                                  className="h-8 text-xs flex-1"
                                />
                                <Input
                                  value={option.value}
                                  onChange={(e) =>
                                    handleUpdateOption(index, {
                                      ...option,
                                      value: e.target.value,
                                    })
                                  }
                                  placeholder="Value"
                                  className="h-8 text-xs flex-1 bg-muted/20 font-mono"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                  onClick={() => handleRemoveOption(index)}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            ))}
                            {(!selectedField.options ||
                              selectedField.options.length === 0) && (
                              <div className="flex flex-col items-center justify-center py-6 text-center border-2 border-dashed rounded-lg bg-muted/5">
                                <p className="text-xs text-muted-foreground">
                                  No options defined
                                </p>
                                <Button
                                  variant="link"
                                  size="sm"
                                  onClick={handleAddOption}
                                  className="text-[10px] h-6"
                                >
                                  Add first option
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-muted/10">
              <div className="p-5 rounded-full bg-background border shadow-sm mb-4">
                <Settings2 className="h-8 w-8 text-muted-foreground/30" />
              </div>
              <h3 className="font-medium text-sm text-muted-foreground">
                No Field Selected
              </h3>
              <p className="text-xs text-muted-foreground/60 max-w-[200px] mt-2 leading-relaxed">
                Select a field from the list above to customize its properties.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
