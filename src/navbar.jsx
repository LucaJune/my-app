import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import myImageLight from './logo-light.png';
import myImageDark from './logo-dark.png';
import './navbar.css';

function NavBar({ language, theme }) {
  const navigate = useNavigate();
  const logo = theme === "dark" ? myImageDark : myImageLight;

  return (
    <Navbar
      expand="md"
      collapseOnSelect={true}
      className={theme}
    >
      <Container>
        <Navbar.Brand>
          <div className="navbar-brand">
            <img
              src={logo}
              alt="EasyList Logo"
              className="navbar-brand-img"
            />
            <div>
              <span className="navbar-brand-text">EasyList App</span>
              <div className="navbar-brand-subtext">
                {language === "CZ" ? "Vítejte ve vaší osobní" : "Welcome to your personal"} <br />
                {language === "CZ" ? "aplikaci nákupního seznamu!" : "shopping list application!"}
              </div>
            </div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              onClick={() => navigate("")}
              active={window.location.pathname === "/"}
              eventKey="shoppingList"
              className="nav-link"
            >
              {language === "CZ" ? "Domů" : "Home"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
