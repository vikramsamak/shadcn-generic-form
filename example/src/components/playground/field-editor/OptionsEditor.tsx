import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePlaygroundStore } from '../store';

export function OptionsEditor() {
  const { fields, selectedFieldId, addOption, updateOption, removeOption } =
    usePlaygroundStore();

  const field = fields.find((f) => f.id === selectedFieldId);
  const options = field?.options || [];

  if (!field) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
          Options
        </h4>
        <Button
          variant="outline"
          size="sm"
          onClick={() => addOption(field.id)}
          className="h-7 px-2 text-[10px] uppercase font-bold"
        >
          <Plus className="mr-1 h-3 w-3" />
          Add Option
        </Button>
      </div>

      <div className="space-y-2">
        {options.map((option, index) => (
          <div
            key={index}
            className="group flex items-center gap-2 p-2 rounded-md border bg-background/50"
          >
            <GripVertical className="h-3 w-3 text-muted-foreground/40 shrink-0" />
            <div className="grid grid-cols-2 gap-2 flex-1">
              <Input
                value={option.label}
                onChange={(e) =>
                  updateOption(field.id, index, {
                    ...option,
                    label: e.target.value,
                  })
                }
                placeholder="Label"
                className="h-8 text-xs"
              />
              <Input
                value={option.value}
                onChange={(e) =>
                  updateOption(field.id, index, {
                    ...option,
                    value: e.target.value,
                  })
                }
                placeholder="Value"
                className="h-8 text-xs font-mono"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeOption(field.id, index)}
              className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        ))}

        {options.length === 0 && (
          <div className="text-center py-6 border border-dashed rounded-lg bg-muted/5">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              No options defined
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
