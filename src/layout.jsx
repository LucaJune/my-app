import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";
import NavBar from "./navbar";

function Layout({ useMockData, language, theme }) {
  return (
    <>
      <NavBar language={language} theme={theme} />
      <Container fluid className={`p-0 ${theme}`}>
        <div className="mt-56">
          <Outlet context={{ useMockData, language, theme }} />
        </div>
      </Container>
    </>
  );
}

export default Layout;
