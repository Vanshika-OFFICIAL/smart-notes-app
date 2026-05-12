import Background from "../components/layout/Background";
import AuthCard from "../components/auth/AuthCard";
import RegisterForm from "../components/auth/RegisterForm";

export default function Register() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background:
        "linear-gradient(135deg,#FDF8EE,#FFF3E8,#FEFDF5,#F0FAF4)"
    }}>
      <Background />
      <AuthCard>
        <RegisterForm />
      </AuthCard>
    </div>
  );
}