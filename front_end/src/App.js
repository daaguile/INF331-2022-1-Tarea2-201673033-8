import React, { Component, Fragment } from "react";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
// import { Container } from 'reactstrap';
// import NavBar from './components/NavBar';
// import CreateContact from './components/CreateContact';
// import EditContact from './components/EditContact';
// import Contacts from './components/Contacts';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom";


export default class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Home />
      </Fragment>
    );
  }
}


// function App() {
//   return (
//     <Router>
//       <NavBar />
//       <Container>
//         <Routes>
//           {/* <Route path="/" element={<App />} /> */}
//           <Route path="/" element={<Contacts />} />
//           <Route path="/contact/new" element={<CreateContact />} />
//           <Route path="/contact/edit" element={<EditContact />} />
//         </Routes>

//       </Container>
//     </Router>

//   );
// }

// export default App;
