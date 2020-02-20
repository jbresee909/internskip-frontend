import React from "react";
import "./App.css";
import axios from "axios";

function App() {
  axios
    .get("https://bresee-internskip.herokuapp.com/api/users")
    .then(users => console.log(users))
    .catch(err => console.log(err));
  return <h1>temp</h1>;
}

export default App;
