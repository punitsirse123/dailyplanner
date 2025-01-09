import { useState } from "react";
import { PlusCircle, CheckCircle2, Circle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  user_id: string;
  due_date: string;
}

interface TaskListProps {
  tasks: Task[] | undefined;
  isLoading: boolean;
  selectedDate: Date;
  onTasksChange: () => void;
}

export function TaskList({ tasks, isLoading, selectedDate, onTasksChange }: TaskListProps) {
  const [newTask, setNewTask] = useState("");

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const { error } = await supabase
      .from('tasks')
      .insert({
        title: newTask,
        due_date: format(selectedDate, 'yyyy-MM-dd'),
        completed: false,
        user_id: (await supabase.auth.getUser()).data.user?.id
      });

    if (!error) {
      setNewTask("");
      onTasksChange();
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks?.find(t => t.id === id);
    if (!task) return;

    const { error } = await supabase
      .from('tasks')
      .update({ completed: !task.completed })
      .eq('id', id);

    if (!error) {
      onTasksChange();
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="input-minimal"
        />
        <Button type="submit" size="icon" variant="ghost" className="transition-transform hover:scale-105 active:scale-95">
          <PlusCircle className="h-5 w-5" />
        </Button>
      </form>
      {isLoading ? (
        <p className="text-muted-foreground">Loading tasks...</p>
      ) : (
        <ul className="space-y-2">
          {tasks?.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-2 group animate-fade-in transition-all duration-200 hover:translate-x-1"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </button>
              <span
                className={`flex-1 ${
                  task.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {task.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}