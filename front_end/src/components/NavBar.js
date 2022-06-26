import React from "react";
import { Navbar, NavbarBrand, NavbarText } from 'reactstrap';


export default function NavBar() {
    return (
        <Navbar
            color="dark"
            dark
            expand="md"
            light
            className="mb-4"
        >
            <NavbarBrand>
                INF331 - Tarea 3
            </NavbarBrand>
            <NavbarText>
                Diego Aguilera
            </NavbarText>
        </Navbar>
    );
}