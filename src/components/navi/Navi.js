import React, { useState } from 'react';
import {Link} from "react-router-dom"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import CartSummary from '../cart/CartSummary';

// const Navi = (args) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggle = () => setIsOpen(!isOpen);
export default class Navi extends React.Component{
  constructor(props){
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle(){
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render(){
  return  (
    <div>
      <Navbar color="light" light expands="md">
        <NavbarBrand><Link to="/">Northwind</Link></NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink><Link to="/saveproduct">Add product</Link></NavLink>
          </NavItem>
      <CartSummary/>
      </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
}