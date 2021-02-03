import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const Header = ({ user, onLogout }) => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">REACT BANK - Project</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {user ? (
                            <Nav.Link onClick={onLogout}>LOG-OUT</Nav.Link>
                        ) : (
                            <Nav.Link as={Link} to="/login">
                                LOG-IN
                            </Nav.Link>
                        )}
                        {user && (
                            <NavDropdown
                                title="TEST용 이동"
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item
                                    as={Link}
                                    to="/Main"
                                ></NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/MyAccount">
                                    MyAccount
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/BankTransfer">
                                    송금
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">
                                    Something
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default Header;
