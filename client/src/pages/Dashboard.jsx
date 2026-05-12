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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#FDF8EE,#FFF3E8,#FEFDF5,#F0FAF4)",
        position: "relative",
      }}
    >
      <Background />

      <Navbar
        search={search}
        setSearch={setSearch}
        notes={notes}
        setTitle={setTitle}
        setText={setText}
        setEditingId={setEditingId}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 24px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* HERO */}
        <div
          style={{
            marginBottom: "32px",
          }}
        >
          <h1
            style={{
              fontSize: "42px",
              fontFamily: "Fraunces, serif",
              color: "#2A1F0D",
              marginBottom: "10px",
            }}
          >
            Welcome to{" "}
            <span
              style={{
                color: "#F4845F",
                fontStyle: "italic",
              }}
            >
              Smart Notes
            </span>
          </h1>

          <p
            style={{
              color: "#6B5B3E",
              fontSize: "16px",
            }}
          >
            Capture your thoughts beautifully ✨
          </p>
        </div>

        {/* CREATE NOTE */}
        <div
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(246,195,71,0.15)",
            borderRadius: "28px",
            padding: "28px",
            boxShadow: "0 10px 40px rgba(244,132,95,0.08)",
            marginBottom: "34px",
          }}
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "25px",
              fontWeight: "700",
              marginBottom: "18px",
              color: "#2A1F0D",
            }}
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your thoughts here..."
            style={{
              width: "100%",
              minHeight: "160px",
              border: "none",
              outline: "none",
              resize: "none",
              background: "transparent",
              fontSize: "16px",
              color: "#2A1F0D",
              lineHeight: 1.7,
            }}
          />

          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              marginTop: "20px",
              padding: "13px 24px",
              borderRadius: "16px",
              border: "none",
              background: "linear-gradient(135deg,#F6C347,#F4845F)",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
              boxShadow: "0 10px 25px rgba(244,132,95,0.2)",
            }}
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
              style={{
                marginLeft: "12px",
                padding: "13px 20px",
                borderRadius: "14px",
                border: "1px solid #eee",
                background: "white",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          )}
        </div>

        {/* EMPTY STATE */}
        {notes.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: "#8B7355",
              padding: "50px 0",
              fontSize: "17px",
            }}
          >
            No notes yet ✨
          </div>
        )}

        {/* NOTES GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "22px",
          }}
        >
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
                style={{
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(14px)",
                  borderRadius: "24px",
                  padding: "22px",
                  border: "1px solid rgba(246,195,71,0.15)",
                  boxShadow: "0 10px 30px rgba(244,132,95,0.08)",
                  position: "relative",
                  transition: "0.3s",
                }}
              >
                {/* DELETE BUTTON */}
                <button
                  onClick={() => handleDelete(note._id)}
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    border: "none",
                    background: "#fff2ef",
                    color: "#F4845F",
                    width: "34px",
                    height: "34px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </button>

                {/* NOTE CONTENT */}
                <h3
                  style={{
                    marginBottom: "12px",
                    color: "#2A1F0D",
                    fontSize: "22px",
                  }}
                >
                  {note.title || "Untitled"}
                </h3>
                <p
                  style={{
                    color: "#4A3A25",
                    lineHeight: 1.8,
                    fontSize: "15px",
                    paddingRight: "20px",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {note.text}
                </p>

                {/* DATE */}
                <p
                  style={{
                    marginTop: "18px",
                    fontSize: "12px",
                    color: "#A89270",
                  }}
                >
                  {new Date(note.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
