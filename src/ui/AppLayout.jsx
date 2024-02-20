import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import PageNotFound from "../pages/PageNotFound";
import { useSizeChecker } from "../hooks/useSizeChecker";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  const { allowed } = useSizeChecker();

  return (
    <>
      {allowed ? (
        <StyledAppLayout>
          <Header />
          <Sidebar />
          <Main>
            <Container>
              <Outlet />
            </Container>
          </Main>
        </StyledAppLayout>
      ) : (
        <PageNotFound screenSize={true} />
      )}
    </>
  );
}

export default AppLayout;
