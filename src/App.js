
import './App.css';
import React from"react"
// import Name from "./components/Name";
import Welcome from "./components/Welcome";
import Student from "./components/student/Student";


function App() {
  return (

  <React.Fragment>
    <center>
    <Welcome/>
   
    <Student/>
    </center>
  </React.Fragment>
  );
}

export default App;
