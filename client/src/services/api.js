import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 🔐 Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

/* ===========================
   AUTH APIs
=========================== */

// ✅ Register
export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

// ✅ Login
export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

// ✅ Forgot Password
export const forgotPassword = async (email) => {
  const res = await API.post("/auth/forgot-password", { email });
  return res.data;
};

// ✅ Reset Password
export const resetPassword = async (token, password) => {
  const res = await API.post(`/auth/reset-password/${token}`, {
    password,
  });
  return res.data;
};
/* =========================
   NOTES APIs
========================= */

export const createNote = async (
  data
) => {
  const res = await API.post(
    "/notes",
    data
  );

  return res.data;
};

export const getNotes = async () => {
  const res = await API.get("/notes");

  return res.data;
};

export const deleteNote = async (id) => {
  const res = await API.delete(
    `/notes/${id}`
  );

  return res.data;
};
export const updateNote = async (
  id,
  data
) => {
  const res = await API.put(
    `/notes/${id}`,
    data
  );

  return res.data;
};

export default API;