const Note = require("./models/Note");

/* =========================
   CREATE NOTE
========================= */

exports.createNote = async (
  req,
  res
) => {
  try {
    const note = await Note.create({
      title:
        req.body.title ||
        "Untitled",

      text: req.body.text,

      user: req.user.id,
    });

    res.status(201).json(note);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

/* =========================
   GET NOTES
========================= */

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(notes);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
/* =========================
   UPDATE NOTE
========================= */
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        text: req.body.text,
      },
      { new: true }
    );

    res.json(note);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

/* =========================
   DELETE NOTE
========================= */

exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Note deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};