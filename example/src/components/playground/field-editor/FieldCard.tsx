import { Copy, Trash2, MoreVertical, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlaygroundField } from '../types';
import { FIELD_TYPES } from './constants';

interface FieldCardProps {
  field: PlaygroundField;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDuplicate: (id: string) => void;
  onRemove: (id: string) => void;
}

export function FieldCard({
  field,
  isSelected,
  onSelect,
  onDuplicate,
  onRemove,
}: FieldCardProps) {
  const fieldTypeInfo = FIELD_TYPES.find((f) => f.type === field.type);
  const Icon = fieldTypeInfo ? fieldTypeInfo.icon : Type;

  return (
    <div
      className={cn(
        'group flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all',
        isSelected
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-border hover:border-primary/30 hover:bg-muted/30'
      )}
      onClick={() => onSelect(field.id)}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <div
          className={cn(
            'p-2 rounded-md border transition-colors',
            isSelected ? 'bg-primary/10 border-primary/20' : 'bg-muted/50'
          )}
        >
          <Icon
            className={cn(
              'h-4 w-4',
              isSelected ? 'text-primary' : 'text-muted-foreground'
            )}
          />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-sm font-medium truncate">{field.label}</span>
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
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onDuplicate(field.id)}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive font-medium"
              onClick={() => onRemove(field.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
