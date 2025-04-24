import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TaskList } from "@/components/dashboard/TaskList";
import { NoteList } from "@/components/dashboard/NoteList";
import { DateHeader } from "@/components/dashboard/DateHeader";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const prefetchAdjacentDates = async (date: Date) => {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    const prevDay = new Date(date);
    prevDay.setDate(date.getDate() - 1);

    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ["tasks", format(nextDay, "yyyy-MM-dd")],
        queryFn: () => fetchTasks(nextDay),
      }),
      queryClient.prefetchQuery({
        queryKey: ["notes", format(nextDay, "yyyy-MM-dd")],
        queryFn: () => fetchNotes(nextDay),
      }),
      queryClient.prefetchQuery({
        queryKey: ["tasks", format(prevDay, "yyyy-MM-dd")],
        queryFn: () => fetchTasks(prevDay),
      }),
      queryClient.prefetchQuery({
        queryKey: ["notes", format(prevDay, "yyyy-MM-dd")],
        queryFn: () => fetchNotes(prevDay),
      }),
    ]);
  };

  const fetchTasks = async (date: Date) => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("due_date", format(date, "yyyy-MM-dd"));

    if (error) throw error;
    return data;
  };

  const fetchNotes = async (date: Date) => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("date", format(date, "yyyy-MM-dd"));

    if (error) throw error;
    return data;
  };

  const {
    data: tasksData,
    isLoading: tasksLoading,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: ["tasks", format(selectedDate, "yyyy-MM-dd")],
    queryFn: () => fetchTasks(selectedDate),
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: notesData,
    isLoading: notesLoading,
    refetch: refetchNotes,
  } = useQuery({
    queryKey: ["notes", format(selectedDate, "yyyy-MM-dd")],
    queryFn: () => fetchNotes(selectedDate),
    staleTime: 1000 * 60 * 5,
  });

  const handleDateChange = async (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      await prefetchAdjacentDates(date);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again.",
      });
    } else {
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <ThemeToggle />
        <Button
          variant="outline"
          size="icon"
          onClick={handleLogout}
          className="transition-all duration-200 hover:scale-105"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>

      <div className="max-w-7xl mx-auto">
        <DateHeader selectedDate={selectedDate} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 md:col-span-1 animate-fade-in transition-all duration-200 hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Calendar</h2>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateChange}
              className="rounded-md border w-full"
            />
          </Card>

          <section className="space-y-6 animate-fade-in md:col-span-2">
            <Card className="p-6 transition-all duration-200 hover:shadow-lg">
              {tasksLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <TaskList
                  tasks={tasksData}
                  isLoading={tasksLoading}
                  selectedDate={selectedDate}
                  onTasksChange={refetchTasks}
                />
              )}
            </Card>

            <Card className="p-6 transition-all duration-200 hover:shadow-lg">
              {notesLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <NoteList
                  notes={notesData}
                  isLoading={notesLoading}
                  selectedDate={selectedDate}
                  onNotesChange={refetchNotes}
                />
              )}
            </Card>
          </section>
        </div>
      </div>

      {/* Footer links with margin-bottom */}
      <footer className="mt-4 text-left text-gray-400 text-sm"> {/* Footer container */}
        <p>
          © 2025 Cliqby 
          <a 
            href="https://cliqby.com/privacy-policy" 
            className="hover:underline ml-2 mr-2"
          >
            Privacy Policy
          </a> 
          | 
          <a 
            href="https://cliqby.com"
            className="hover:underline ml-2"
          >
            About Us
          </a>
        </p>
      </footer>
    </div>
  );
}
