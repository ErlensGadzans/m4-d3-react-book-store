import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from "./components/NavBar"
import {Container, Row} from "react-bootstrap"
import WarningSign from './components/WarningSign';

function App() {
  return (
    <Container>
          <Row>
            <NavBar />
            <WarningSign text="WARNING"/>

          </Row>
    </Container>


  );
}

export default App;
