import { GAPS, GRID_COLS } from './constants';
import { cn } from '@/lib/utils';

export const getLayoutClassName = (
  layout: 'grid' | 'flex',
  columns?: number,
  gap?: number
) => {
  const colClass = GRID_COLS[columns || 2] || 'grid-cols-2';
  const gapClass = GAPS[gap || 4] || 'gap-4';

  return cn(
    layout === 'grid' ? 'grid' : 'flex flex-wrap',
    layout === 'grid' ? `${colClass} ${gapClass}` : gapClass
  );
};
