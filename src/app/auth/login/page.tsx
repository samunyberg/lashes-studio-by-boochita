import LoginForm from '@/components/auth/LoginForm';

interface Props {
  searchParams: { registrationSuccess: string };
}

const LoginPage = ({ searchParams: { registrationSuccess } }: Props) => {
  return <LoginForm registrationSuccess={registrationSuccess} />;
};

export default LoginPage;
