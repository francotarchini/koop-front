import React, { Component } from "react";
import Nav from "./components/Nav";
import Productos from "./components/Productos";
import "./Nav.css";

export default class App extends Component{
  render(){
    return (
      <div>
         <Nav/>   
         <Productos/>   
      </div>
    );
  }
}


