import React, { Component } from "react";

export default class Nav extends Component{
  render() {
    return (
      <>
      <header>
        <nav id="menu">
          <ul class="clearfix logo">
            <li>
              <a href="#.html">Inicio</a>
            </li>
            <li>
              <a href="#.html">Ventas</a>
            </li>
            <li>
              <a href="#.html">Productos</a>
            </li>
            <li>
              <a href="#">Vendedores</a>
            </li>
            <li>
              <a href="#">Usuarios</a>
            </li>
            <li class="item-r">
              <a href="#">Log in</a>
            </li>
          </ul>
          <a href="" id="pull">
            Menú
          </a>
        </nav>
      </header>
      </>
    );
  }
}
