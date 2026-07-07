import Background from "../components/layout/Background";
import AuthCard from "../components/auth/AuthCard";
import RegisterForm from "../components/auth/RegisterForm";

export default function Register() {
  return (
    <div className="smart-bg relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <Background />
      <AuthCard>
        <RegisterForm />
      </AuthCard>
    </div>
  );
}