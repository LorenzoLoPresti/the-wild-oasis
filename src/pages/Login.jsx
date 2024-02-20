import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import PageNotFound from "./PageNotFound";
import { useSizeChecker } from "../hooks/useSizeChecker";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  const { allowed } = useSizeChecker();

  return (
    <>
      {allowed ? (
        <LoginLayout>
          <Logo />
          <Heading as="h4">Log in to your account</Heading>
          <LoginForm />
        </LoginLayout>
      ) : (
        <PageNotFound screenSize={true} />
      )}
    </>
  );
}

export default Login;
