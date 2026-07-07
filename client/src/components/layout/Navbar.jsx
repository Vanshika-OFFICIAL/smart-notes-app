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
    <header className="sticky top-0 z-30 border-b border-[rgba(246,195,71,0.15)] bg-[rgba(255,253,248,0.75)] backdrop-blur-[18px]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-4">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 self-start text-left"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#F6C347] to-[#F4845F] text-lg font-bold text-white sm:h-12 sm:w-12 sm:text-[1.15rem]">
          ✦
          </div>

          <h2 className="font-['Fraunces',serif] text-[1.35rem] font-bold text-[#2A1F0D] sm:text-[1.45rem]">
            Smart Notes
          </h2>
        </button>

        <div className="relative w-full max-w-none lg:max-w-[620px]">
          <div className="flex items-center overflow-hidden rounded-[18px] border border-[rgba(246,195,71,0.18)] bg-[rgba(255,255,255,0.9)] shadow-[0_8px_24px_rgba(244,132,95,0.05)]">
          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search notes..."
            className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3.5 text-sm text-[#2A1F0D] outline-none placeholder:text-[#A89270] sm:px-5 sm:py-4 sm:text-base"
          />

          <div className="px-4 text-[#F4845F] sm:px-5">
            <FaSearch />
          </div>
          </div>

          {search && filteredNotes.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-20 mt-3 max-h-[60vh] overflow-auto rounded-[18px] border border-[rgba(246,195,71,0.15)] bg-[rgba(255,255,255,0.96)] p-3 shadow-[0_10px_40px_rgba(0,0,0,0.08)] sm:p-4">
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
                    className="mb-2 cursor-pointer rounded-[12px] px-3 py-3 transition hover:bg-[#fff8f2] last:mb-0"
                  >
                    <h4 className="mb-1 text-sm font-semibold text-[#2A1F0D] sm:text-base">
                      {
                        note.title
                      }
                    </h4>

                    <p className="text-xs leading-6 text-[#6B5B3E] sm:text-sm">
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

      <button
        onClick={handleLogout}
        className="inline-flex min-h-12 items-center justify-center rounded-[16px] bg-gradient-to-br from-[#F6C347] to-[#F4845F] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(244,132,95,0.14)] transition active:scale-[0.99] sm:px-6"
      >
        Logout
      </button>
      </div>
    </header>
  );
}