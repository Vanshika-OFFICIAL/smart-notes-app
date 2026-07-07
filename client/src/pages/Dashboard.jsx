import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Background from "../components/layout/Background";

import { createNote, getNotes, deleteNote, updateNote } from "../services/api";

export default function Dashboard() {
  const [text, setText] = useState("");

  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  /* =========================
     FETCH NOTES
  ========================= */

  const fetchNotes = async () => {
    try {
      const data = await getNotes();

      setNotes(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  /* =========================
     CREATE NOTE
  ========================= */

  const handleSave = async () => {
    if (!text.trim()) {
      return alert("Write something");
    }

    try {
      setLoading(true);

      // UPDATE NOTE
      if (editingId) {
        const updated = await updateNote(editingId, {
          title,
          text,
        });

        setNotes(
          notes.map((note) => (note._id === editingId ? updated : note)),
        );

        setEditingId(null);
      } else {
        // CREATE NOTE
        const newNote = await createNote({
          title,
          text,
        });

        setNotes([newNote, ...notes]);
      }

      // CLEAR INPUTS
      setTitle("");
      setText("");
    } catch (err) {
      console.log(err);

      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     DELETE NOTE
  ========================= */

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);

      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.log(err);

      alert("Delete failed");
    }
  };

  return (
    <div className="smart-bg relative min-h-dvh overflow-x-clip">
      <Background />

      <Navbar
        search={search}
        setSearch={setSearch}
        notes={notes}
        setTitle={setTitle}
        setText={setText}
        setEditingId={setEditingId}
      />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <section className="mb-6 sm:mb-8 lg:mb-10">
          <h1 className="max-w-3xl font-['Fraunces',serif] text-[clamp(2rem,4vw,2.75rem)] leading-tight tracking-tight text-[#2A1F0D]">
            Welcome to{" "}
            <span className="italic text-[#F4845F]">
              Smart Notes
            </span>
          </h1>

          <p className="mt-2 text-sm text-[#6B5B3E] sm:text-base">
            Capture your thoughts beautifully ✨
          </p>
        </section>

        <section className="mb-6 rounded-[28px] border border-[rgba(246,195,71,0.15)] bg-[rgba(255,255,255,0.72)] p-4 shadow-[0_10px_40px_rgba(244,132,95,0.08)] backdrop-blur-[18px] sm:mb-8 sm:p-6 lg:mb-10 lg:p-7">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
            className="mb-3 w-full border-0 bg-transparent text-[clamp(1.25rem,3vw,1.625rem)] font-bold text-[#2A1F0D] outline-none placeholder:text-[#A89270] sm:mb-4"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your thoughts here..."
            className="min-h-[160px] w-full resize-y border-0 bg-transparent text-sm leading-7 text-[#2A1F0D] outline-none placeholder:text-[#A89270] sm:min-h-[190px] sm:text-base lg:min-h-[220px]"
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              onClick={handleSave}
              disabled={loading}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-[16px] bg-gradient-to-br from-[#F6C347] to-[#F4845F] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(244,132,95,0.2)] transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-80 sm:w-auto sm:px-6"
            >
              {loading
                ? "Saving..."
                : editingId
                  ? "Update Note →"
                  : "Save Note →"}
            </button>

            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setTitle("");
                  setText("");
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-[14px] border border-[rgba(246,195,71,0.22)] bg-white px-5 py-3 text-sm font-medium text-[#2A1F0D] transition hover:bg-[#fff9f3] active:scale-[0.99] sm:w-auto"
              >
                Cancel
              </button>
            )}
          </div>
        </section>

        {notes.length === 0 && (
          <div className="py-12 text-center text-sm text-[#8B7355] sm:py-16 sm:text-base">
            No notes yet ✨
          </div>
        )}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 2xl:grid-cols-4">
          {notes
            .filter((note) =>
              note.title?.toLowerCase().includes(search.toLowerCase()),
            )
            .map((note) => (
              <div
                key={note._id}
                onClick={() => {
                  setEditingId(note._id);

                  setTitle(note.title || "");

                  setText(note.text);
                }}
                className="group relative min-h-[220px] cursor-pointer rounded-[24px] border border-[rgba(246,195,71,0.15)] bg-[rgba(255,255,255,0.75)] p-4 shadow-[0_10px_30px_rgba(244,132,95,0.08)] backdrop-blur-[14px] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(244,132,95,0.12)] sm:p-5 lg:p-6"
              >
                <button
                  onClick={() => handleDelete(note._id)}
                  aria-label={`Delete note ${note.title || "Untitled"}`}
                  className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-[10px] border-0 bg-[#fff2ef] text-lg font-bold text-[#F4845F] transition hover:bg-[#ffe7e0] focus:outline-none focus:ring-2 focus:ring-[rgba(244,132,95,0.2)] sm:right-4 sm:top-4"
                >
                  ×
                </button>

                <h3 className="mb-3 pr-12 text-[1.125rem] font-semibold leading-snug text-[#2A1F0D] sm:text-[1.25rem]">
                  {note.title || "Untitled"}
                </h3>
                <p className="break-words pr-2 text-sm leading-7 text-[#4A3A25] sm:text-[15px]">
                  {note.text}
                </p>

                <p className="mt-4 text-xs text-[#A89270] sm:mt-5">
                  {new Date(note.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
        </section>
      </main>
    </div>
  );
}
