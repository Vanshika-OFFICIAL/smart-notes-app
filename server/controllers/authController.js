const transporter = require("../config/mailer");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

/* =========================
   REGISTER
========================= */
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

/* =========================
   LOGIN
========================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

/* =========================
   FORGOT PASSWORD
========================= */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;

    user.resetTokenExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    const resetLink = `${process.env.VITE_CLIENT_URL}/reset-password/${token}`;

    await transporter.sendMail({
      from: `"Smart Notes" <${process.env.EMAIL_USER}>`,

      to: email,

      subject: "Smart Notes • Reset Your Password",

      html: `
  <div style="
    font-family:Arial,sans-serif;
    background:#FFF8F2;
    padding:40px;
  ">

    <div style="
      max-width:500px;
      margin:auto;
      background:white;
      border-radius:20px;
      padding:40px;
      box-shadow:0 10px 30px rgba(0,0,0,0.06);
    ">

      <h1 style="
        color:#2A1F0D;
        margin-bottom:10px;
      ">
        Smart Notes ✨
      </h1>

      <p style="
        color:#6B5B3E;
        font-size:16px;
        line-height:1.6;
      ">
        We received a request to reset your password.
      </p>

      <div style="margin:30px 0">
        <a
          href="${resetLink}"
          style="
            background:linear-gradient(135deg,#F6C347,#F4845F);
            color:white;
            text-decoration:none;
            padding:14px 24px;
            border-radius:12px;
            font-weight:600;
            display:inline-block;
          "
        >
          Reset Password →
        </a>
      </div>

      <p style="
        color:#8B7355;
        font-size:14px;
      ">
        This link expires in 10 minutes.
      </p>

    </div>
  </div>
  `,
    });

    res.json({
      message: "Reset link generated",
      resetLink,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

/* =========================
   RESET PASSWORD
========================= */
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    const { password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
