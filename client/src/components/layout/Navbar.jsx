import {
  FaSearch,
} from "react-icons/fa";

import { useNavigate }
from "react-router-dom";

export default function Navbar({
  search,
  setSearch,
  notes,
  setTitle,
  setText,
  setEditingId,
}) {
  const navigate =
    useNavigate();

  const handleLogout =
    () => {
      localStorage.removeItem(
        "token"
      );

      navigate("/");
    };

  // SEARCH RESULTS
  const filteredNotes =
    notes.filter((note) =>
      note.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,

        backdropFilter:
          "blur(18px)",

        background:
          "rgba(255,253,248,0.75)",

        borderBottom:
          "1px solid rgba(246,195,71,0.15)",

        padding: "18px 34px",

        display: "flex",

        justifyContent:
          "space-between",

        alignItems: "flex-start",

        gap: "22px",
      }}
    >
      {/* LOGO */}
      <div
        onClick={() =>
          navigate("/dashboard")
        }

        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
          minWidth: "220px",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",

            borderRadius: "14px",

            background:
              "linear-gradient(135deg,#F6C347,#F4845F)",

            display: "flex",

            alignItems: "center",

            justifyContent:
              "center",

            color: "white",

            fontWeight: "700",

            fontSize: "18px",
          }}
        >
          ✦
        </div>

        <h2
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#2A1F0D",
          }}
        >
          Smart Notes
        </h2>
      </div>

      {/* SEARCH AREA */}
      <div
        style={{
          flex: 1,
          maxWidth: "620px",
          position: "relative",
        }}
      >
        {/* SEARCH INPUT */}
        <div
          style={{
            display: "flex",
            alignItems: "center",

            background:
              "rgba(255,255,255,0.9)",

            border:
              "1px solid rgba(246,195,71,0.18)",

            borderRadius: "18px",

            overflow: "hidden",
          }}
        >
          <input
            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

            placeholder="Search notes..."

            style={{
              flex: 1,

              padding:
                "15px 18px",

              border: "none",

              outline: "none",

              background:
                "transparent",

              fontSize: "16px",

              color: "#2A1F0D",
            }}
          />

          <div
            style={{
              padding:
                "0 18px",

              color: "#F4845F",

              fontSize: "16px",
            }}
          >
            <FaSearch />
          </div>
        </div>

        {/* SEARCH DROPDOWN */}
        {search &&
          filteredNotes.length >
            0 && (
            <div
              style={{
                position:
                  "absolute",

                top: "74px",

                width: "100%",

                background:
                  "rgba(255,255,255,0.96)",

                borderRadius:
                  "18px",

                padding: "14px",

                boxShadow:
                  "0 10px 40px rgba(0,0,0,0.08)",

                border:
                  "1px solid rgba(246,195,71,0.15)",

                zIndex: 999,
              }}
            >
              {filteredNotes.map(
                (note) => (
                  <div
                    key={
                      note._id
                    }

                    onClick={() => {
                      setEditingId(
                        note._id
                      );

                      setTitle(
                        note.title
                      );

                      setText(
                        note.text
                      );

                      setSearch("");
                    }}

                    style={{
                      padding:
                        "14px",

                      borderRadius:
                        "12px",

                      cursor:
                        "pointer",

                      marginBottom:
                        "8px",

                      transition:
                        "0.2s",
                    }}
                  >
                    <h4
                      style={{
                        marginBottom:
                          "6px",

                        color:
                          "#2A1F0D",
                      }}
                    >
                      {
                        note.title
                      }
                    </h4>

                    <p
                      style={{
                        fontSize:
                          "14px",

                        color:
                          "#6B5B3E",
                      }}
                    >
                      {note.text.slice(
                        0,
                        60
                      )}
                      ...
                    </p>
                  </div>
                )
              )}
            </div>
          )}
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}

        style={{
          padding:
            "14px 22px",

          borderRadius: "16px",

          border: "none",

          background:
            "linear-gradient(135deg,#F6C347,#F4845F)",

          color: "white",

          fontWeight: "600",

          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}