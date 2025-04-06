import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import myImage from './logo.png';
import './navbar.css';

function NavBar() {
  const navigate = useNavigate();

  return (
    <Navbar
      expand="md"

      collapseOnSelect={true}
    >
      <Container>
        <Navbar.Brand>
          <div className="navbar-brand">
            <img
              src={myImage}
              alt="MyJourney Logo"
              className="navbar-brand-img"
            />
            <div>
              <span className="navbar-brand-text">EasyList App</span>
              <div className="navbar-brand-subtext">
                Welcome to your personal <br />
                shopping list application!
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
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("shoppingArchive")}
              active={window.location.pathname === "/shoppingArchive"}
              eventKey="shoppingArchive"
              className="nav-link"
            >
              Archive
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
