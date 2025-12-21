import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface OptionsEditorProps {
  options: { label: string; value: string }[];
  onAdd: () => void;
  onUpdate: (index: number, updates: { label: string; value: string }) => void;
  onRemove: (index: number) => void;
}

export function OptionsEditor({
  options,
  onAdd,
  onUpdate,
  onRemove,
}: OptionsEditorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
          Options
        </h4>
        <Button
          variant="outline"
          size="sm"
          onClick={onAdd}
          className="h-7 text-[10px] px-2"
        >
          <Plus className="h-3 w-3 mr-1" /> Add Option
        </Button>
      </div>

      <div className="space-y-2">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex gap-2 items-center bg-background border p-2 rounded-md shadow-sm"
          >
            <Input
              value={option.label}
              onChange={(e) =>
                onUpdate(index, { ...option, label: e.target.value })
              }
              placeholder="Label"
              className="h-8 text-xs flex-1"
            />
            <Input
              value={option.value}
              onChange={(e) =>
                onUpdate(index, { ...option, value: e.target.value })
              }
              placeholder="Value"
              className="h-8 text-xs flex-1 bg-muted/20 font-mono"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:bg-destructive/10"
              onClick={() => onRemove(index)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
        {options.length === 0 && (
          <div className="flex flex-col items-center justify-center py-6 text-center border-2 border-dashed rounded-lg bg-muted/5">
            <p className="text-xs text-muted-foreground">No options defined</p>
            <Button
              variant="link"
              size="sm"
              onClick={onAdd}
              className="text-[10px] h-6"
            >
              Add first option
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
