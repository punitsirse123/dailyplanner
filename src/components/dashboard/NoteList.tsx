import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

interface Note {
  id: string;
  content: string;
  type: "note" | "learning";
  user_id: string;
  date: string;
  created_at?: string | null;
}

type DatabaseNote = {
  id: string;
  content: string;
  type: string;
  user_id: string;
  date: string;
  created_at: string;
}

interface NoteListProps {
  notes: DatabaseNote[] | undefined;
  isLoading: boolean;
  selectedDate: Date;
  onNotesChange: () => void;
}

export function NoteList({ notes, isLoading, selectedDate, onNotesChange }: NoteListProps) {
  const [newNote, setNewNote] = useState("");

  const addNote = async (type: "note" | "learning") => {
    if (!newNote.trim()) return;
    
    const { error } = await supabase
      .from('notes')
      .insert({
        content: newNote,
        type,
        date: format(selectedDate, 'yyyy-MM-dd'),
        user_id: (await supabase.auth.getUser()).data.user?.id
      });

    if (!error) {
      setNewNote("");
      onNotesChange();
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Notes & Learning</h2>
      <div className="space-y-4">
        <Textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write your thoughts..."
          className="input-minimal resize-none transition-all duration-200 focus:translate-y-[-2px]"
          rows={4}
        />
        <div className="flex gap-2">
          <Button
            onClick={() => addNote("note")}
            className="flex-1 button-minimal transition-transform hover:scale-105 active:scale-95"
          >
            Add Note
          </Button>
          <Button
            onClick={() => addNote("learning")}
            className="flex-1 button-minimal transition-transform hover:scale-105 active:scale-95"
          >
            Add Learning
          </Button>
        </div>
      </div>
      {isLoading ? (
        <p className="text-muted-foreground mt-4">Loading notes...</p>
      ) : (
        <div className="mt-4 space-y-4">
          {notes?.map((note) => (
            <div
              key={note.id}
              className="p-4 bg-secondary rounded-lg animate-fade-in transition-all duration-200 hover:translate-y-[-2px]"
            >
              <div className="text-xs text-muted-foreground mb-2">
                {note.type === "note" ? "Note" : "Learning"}
              </div>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}