import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
import logo from "./logo.png";
import { useState } from "react";

function Navbar({ onClick, onChange, value }) {
  return (
    <nav className={style.nav}>
      <div>
        <img width={200} src={logo} alt="logo" />
      </div>
      <div className={style.container_search}>
        <input
          value={value}
          type="search"
          name="search"
          id="search"
          onChange={onChange}
          placeholder="Digite o nome de um filme..."
          className={style.search}
        />
        <button onClick={onClick} className={style.botao}>
          Pesquisar
        </button>
      </div>
      <div className={style.container_ul}>
        <ul className={style.ul}>
                    <li>
            <Link className={style.link} to={"/memorias"}> ⭐</Link>
          </li>
          <li>
            <Link className={style.link_principal} to={"/memorias"}> Colecão</Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
