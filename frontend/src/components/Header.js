import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown, Badge } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import './Header.css'

function Header() {
    const [scrolled, setScrolled] = useState(false)
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [scrolled])

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <Navbar expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand className="brand">
                            <i className="fas fa-store"></i>
                            <span>ProShop</span>
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <SearchBox />
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link className="nav-link-custom">
                                    <i className="fas fa-shopping-cart"></i>
                                    Cart
                                    {cartItems.length > 0 && (
                                        <Badge pill bg="danger" className="cart-badge">
                                            {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                        </Badge>
                                    )}
                                </Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown 
                                    title={
                                        <span className="user-dropdown">
                                            <i className="fas fa-user-circle"></i>
                                            {userInfo.name}
                                        </span>
                                    } 
                                    id='username'
                                    className="custom-dropdown"
                                >
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            <i className="fas fa-user"></i> Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        <i className="fas fa-sign-out-alt"></i> Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link className="nav-link-custom">
                                        <i className="fas fa-sign-in-alt"></i> Login
                                    </Nav.Link>
                                </LinkContainer>
                            )}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown 
                                    title={
                                        <span className="admin-dropdown">
                                            <i className="fas fa-cog"></i> Admin
                                        </span>
                                    } 
                                    id='adminmenu'
                                    className="custom-dropdown"
                                >
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>
                                            <i className="fas fa-users"></i> Users
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>
                                            <i className="fas fa-box"></i> Products
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>
                                            <i className="fas fa-shopping-bag"></i> Orders
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
