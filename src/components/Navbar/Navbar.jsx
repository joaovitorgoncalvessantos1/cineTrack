import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
import logo from "./logo.png";

function Navbar() {
  return (
    <nav className={style.nav}>
      <div>
        <img width={200} src={logo} alt="logo" />
      </div>

      <div>
        <ul className={style.ul}>
          <li className={style.li}></li>
          <li><Link to={'/memorias'}> Memorias</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
