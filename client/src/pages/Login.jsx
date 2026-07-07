import Background from "../components/layout/Background";
import AuthCard from "../components/auth/AuthCard";
import LoginForm from "../components/auth/LoginForm";

export default function Login() {
  return (
    <div className="smart-bg relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <Background />
      <AuthCard>
        <LoginForm />
      </AuthCard>
    </div>
  );
}