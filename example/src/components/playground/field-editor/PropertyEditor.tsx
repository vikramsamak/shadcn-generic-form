import { Settings2, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { PlaygroundField } from '../types';
import { OptionsEditor } from './OptionsEditor';

interface PropertyEditorProps {
  selectedField: PlaygroundField | undefined;
  showProperties: boolean;
  onUpdateField: (id: string, updates: Partial<PlaygroundField>) => void;
  onAddOption: () => void;
  onUpdateOption: (
    index: number,
    updates: { label: string; value: string }
  ) => void;
  onRemoveOption: (index: number) => void;
  onBack: () => void;
}

export function PropertyEditor({
  selectedField,
  showProperties,
  onUpdateField,
  onAddOption,
  onUpdateOption,
  onRemoveOption,
  onBack,
}: PropertyEditorProps) {
  return (
    <div
      className={cn(
        'flex flex-col min-h-0 bg-muted/5 flex-1',
        !showProperties && 'hidden'
      )}
    >
      {selectedField ? (
        <div className="flex flex-col h-full overflow-hidden">
          <div className="p-4 border-b shrink-0 flex items-center gap-4 h-14 bg-background/50">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-8 w-8 shrink-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="overflow-hidden">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground truncate">
                Field Properties
              </h3>
              <p className="text-[9px] font-mono text-muted-foreground/50 uppercase truncate leading-none mt-0.5">
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
                        onUpdateField(selectedField.id, { required: checked })
                      }
                    />
                  </div>
                </div>

                {/* Options Group for Select/Radio */}
                {['select', 'radio'].includes(selectedField.type) && (
                  <>
                    <Separator className="opacity-50" />
                    <OptionsEditor
                      options={selectedField.options || []}
                      onAdd={onAddOption}
                      onUpdate={onUpdateOption}
                      onRemove={onRemoveOption}
                    />
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
  );
}
