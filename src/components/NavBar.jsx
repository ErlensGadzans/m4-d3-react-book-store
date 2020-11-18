import React from "react"
import {Container, Navbar} from "react-bootstrap"
export default class NavBar extends React.Component {
render() {
return(
<Container>
  <Navbar expand="lg" variant="light" bg="light">
    <Navbar.Brand href="#">Book store</Navbar.Brand>
  </Navbar>
</Container>
)
}
}