import React, { Component } from "react";
import { Jumbotron, Container,  } from 'reactstrap';
import Wrapper from "./Wrapper";
import "./TopNav.scss";
import API from "../../utils/API";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

export default class Navigation extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            loggedIn: false
        };
    }

    componentDidMount() {
        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                this.setState({
                    loggedIn: true
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    logout() {
        API.logout().then((data)=> {
            window.location.pathname = "/"
        }).catch((err)=> {
            console.log(err)
        })
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar className="navbar" light expand="md">
                    <NavbarBrand href="/" className="titleFont"><i className="fas fa-key"></i> SCKitchen</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/"><i className="fas fa-home light-text"></i></NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <i className="fas fa-user light-text"></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {this.state.loggedIn ? (
                                        <>
                                            <DropdownItem>
                                                <NavLink href="/profile">Profile</NavLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavLink onClick={this.logout}>Logout</NavLink>
                                            </DropdownItem>
                                        </>
                                    ) : (
                                        <>
                                            <DropdownItem>
                                                <NavLink href="/login">login</NavLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavLink href="/signup">signup</NavLink>
                                            </DropdownItem>
                                        </>
                                    )}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>

    <Wrapper>
          <Jumbotron >
            <Container >
            
               <h1 className="text-primary" id = "text-primary">SCKitchen</h1>
               <p className="text-primary"> </p>
               <p className="text-primary" id = "text-primary">Feeding People, Not Landfills/Recovering prepared but not served food from Confernces,Events,Resturants and Food Vendors.</p>
            
            </Container>
          </Jumbotron>
      
                 
      </Wrapper>
                
            </div>


           

        );
    }
}