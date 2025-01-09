import { format } from "date-fns";

interface DateHeaderProps {
  selectedDate: Date;
}

export function DateHeader({ selectedDate }: DateHeaderProps) {
  return (
    <header className="mb-8 animate-fade-in">
      <h1 className="text-4xl font-semibold tracking-tight">
        {format(selectedDate, 'MMMM d, yyyy')}
      </h1>
      <p className="text-muted-foreground mt-2">
        {format(selectedDate, 'EEEE')}
      </p>
    </header>
  );
}