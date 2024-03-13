import AuthPage from '@/components/auth/AuthPage';
import LoginForm from '@/components/auth/LoginForm';

interface Props {
  searchParams: { registrationSuccess: string };
}

const LoginPage = ({ searchParams: { registrationSuccess } }: Props) => {
  return (
    <AuthPage>
      <LoginForm registrationSuccess={registrationSuccess} />
    </AuthPage>
  );
};

export default LoginPage;
